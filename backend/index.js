const express = require("express");
const cors = require("cors");
const connectDB = require('./db');
const User = require('./models/User');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // For session storage in MongoDB
const Post = require('./models/Post'); // Import Post model

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // your React frontend
  credentials: true               // allow cookies/sessions
}));

app.use(express.json()); // To read JSON data

app.use(session({
    secret: 'thisshouldbeabettersecret',  // change in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/linkboard',
        touchAfter: 24 * 3600 // session only updates once a day
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24  // 1 day
    }
}));



connectDB(); // Connect to MongoDB




app.post('/api/register', async (req, res) => {
  const { name, bio, dob, email, password } = req.body;

  try {
    const user = new User({ name,bio,dob, email, password }); // password will be hashed automatically
    await user.save();

    // create session
    req.session.userId = user._id;

    res.status(201).json({ message: '✅ Registration successful', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: '❌ Registration failed. Email may already exist.' });
  }
});


app.get('/api/current-user', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const user = await User.findById(req.session.userId).select("name email bio dob");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});




// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: '❌ Invalid email or password' }); // generic
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: '❌ Invalid email or password' }); // same
    }

    // ✅ Login successful → set session
    req.session.userId = user._id;
    // setCurrentUser(userData);

    res.json({
      message: `✅ Welcome back, ${user.name}`,
      user: { name: user.name, email: user.email }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get posts of the logged-in user
app.get('/api/myposts', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const posts = await Post.find({ author: req.session.userId })
    .populate('author', 'name email')
    .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// 🌍 Get all posts (for homepage)
app.get("/api/posts", async (req, res) => {
  try {
    const isLoggedIn = !!req.session.userId;

    let query = Post.find({})
      .sort({ createdAt: -1 })                   // newest first
      .populate("author", "name");               // get author's name

    if (!isLoggedIn) {
      query = query.limit(5);                    // limit for guest users
    }

    const posts = await query.exec();
    res.json({ posts });

  } catch (err) {
    console.error("Error fetching all posts:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});





app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // clear cookie from browser
    res.json({ message: '✅ Logged out successfully' });
  });
});

// create posts
app.post('/api/post', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Login required' });
  }

  const { title, content } = req.body;

  if (!title || !content || title.trim() === '' || content.trim() === '') {
    return res.status(400).json({ message: 'Title and content required' });
  }

  try {
    const post = new Post({
      title,
      content,
      author: req.session.userId,
    });

    await post.save();

    res.status(201).json({ message: '✅ Post created', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

app.get("/api/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');  // 👈 populate author details

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.delete("/api/post/:id", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Check if the post was created by the current user
    if (String(post.author) !== String(req.session.userId)) {
      return res.status(403).json({ message: "You are not allowed to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Post deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 🧠 DELETE a post by ID (only if user is the author)
// app.delete("/api/post/:id", async (req, res) => {
//   try {
//     if (!req.session.userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     if (post.author.toString() !== req.session.userId) {
//       return res.status(403).json({ message: "Not allowed to delete this post" });
//     }

//     await Post.findByIdAndDelete(req.params.id);

//     res.json({ message: "✅ Post deleted successfully" });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ message: "❌ Server error" });
//   }
// });

// 🧠 PUT (update) post by ID
app.put('/api/post/:id', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.session.userId) {
      return res.status(403).json({ message: "You can't edit this post" });
    }

    const { title, content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: "Content cannot be empty" });
    }

    post.title = title;
    post.content = content;

    await post.save();

    res.json({ message: "✅ Post updated", post });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

app.put('/api/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { name, bio, dob } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { name, bio, dob },
      { new: true }
    ).select("name email bio dob");

    res.json({ message: "✅ Profile updated", user });
  } catch (err) {
    console.error("Profile update failed:", err);
    res.status(500).json({ message: "❌ Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
