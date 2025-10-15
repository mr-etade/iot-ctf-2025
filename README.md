# CMN322 IoT CTF Event 2025

Internet of Things Capture The Flag Challenge System for Western Pacific University

## 📋 Overview

This CTF platform contains 40 challenges covering:
- IoT Fundamentals & Architecture
- Big Data Analytics (4Vs)
- Machine Learning (k-NN)
- Python Programming
- Smart Cities & Industrial IoT
- Data Visualization
- IoT Security

## 🎯 Challenge Breakdown

- **Easy (10 challenges)**: 3 coding + 7 theory
- **Medium (20 challenges)**: 8 coding + 12 theory  
- **Hard (10 challenges)**: 5 coding + 5 theory

## 🚀 Setup Instructions

### Option 1: Local Development

1. **Download all files** to a folder:
   - `index.html`
   - `cmn322.html`
   - `auth.js`
   - `script.js`
   - `styles.css`

2. **Open with a local web server** (required for proper functionality):

   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js:**
   ```bash
   npx http-server -p 8000
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Access the site:**
   - Open browser to `http://localhost:8000`

### Option 2: GitHub Pages (Recommended)

1. **Create a new repository** on GitHub
2. **Upload all 5 files** to the repository
3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: main / root
   - Save
4. **Access your site** at: `https://yourusername.github.io/repository-name/`

### Option 3: Netlify (Free Hosting)

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your folder
3. Get instant URL

## 🔐 Authentication

**Default Password:** `cmn322_iot_2025`

To change the password, edit `auth.js`:
```javascript
const CLASS_PASSWORDS = {
    'CMN322': 'your_new_password_here'
};
```

## 🐍 Python Code Challenges

The platform uses **Pyodide** to run Python code directly in the browser. 

**16 coding challenges** require students to:
- Write Python code in the browser editor
- Click "Run Code" to execute
- Match expected output to reveal flag

### Coding Challenge Topics:
- Temperature sensor data processing
- IoT device status monitoring
- Data filtering and validation
- k-NN distance calculations
- Statistical analysis (mean, std dev)
- Confusion matrix calculations
- Data normalization
- ETL pipeline simulation

## 📝 Challenge Types

### Theory Challenges (24)
Students enter text answers to reveal flags covering:
- IoT architecture concepts
- Big Data characteristics
- Security best practices
- Smart city applications
- Database technologies

### Coding Challenges (16)
Students write Python code that must produce exact output:
- Sensor data processing
- Statistical calculations
- ML algorithm implementations
- Data quality checks

## 🎓 Flag Format

All flags follow this format:
```
CMN322{flag_captured}
```

Example: `CMN322{six_pillars_foundation}`

## 🏆 CTFd Integration

1. **Create challenges on CTFd** at `https://mr-etade.ctfd.io`
2. **Students solve challenges** on the website
3. **Copy revealed flags** from website
4. **Submit flags** on CTFd platform
5. **Earn points** and climb leaderboard

## 💡 Features

- ✅ **Dark theme** with modern UI
- ✅ **40 challenges** based on lecture content
- ✅ **Pyodide integration** for in-browser Python
- ✅ **Hint system** for every challenge
- ✅ **Difficulty filtering** (Easy/Medium/Hard)
- ✅ **Progress tracking** with localStorage
- ✅ **Responsive design** for mobile/desktop
- ✅ **Session authentication** (24-hour validity)

## 🔧 Customization

### Change Password
Edit `auth.js` line 2

### Modify Challenges
Edit `script.js` - update the `CMN322_CHALLENGES` array

### Adjust Styling
Edit `styles.css` - CSS variables at top for colors

### Update Content
Edit `index.html` - modify topics, features, instructions

## 📚 Topics Covered (From Lectures)

1. **Week 2**: Connecting Things - IoT Architecture
2. **Week 3**: Everything Becomes Programmable - Python
3. **Week 4**: Everything Generates Data - Big Data 4Vs
4. **Week 5**: Everything Can Be Automated - AI/ML
5. **Week 6-7**: IoT in Business - Smart Cities, Industry
6. **Week 9**: Data in IoT - Databases, Storage
7. **Week 10**: Fundamentals of Data Analysis - DIKW, Statistics
8. **Week 11-12**: Data Analysis - Correlation, Visualization
9. **Week 13-14**: Advanced Analytics & ML - k-NN, Classification

## 🐛 Troubleshooting

### Pyodide Not Loading
- Check internet connection (Pyodide loads from CDN)
- Wait 10-30 seconds for initial load
- Try refreshing the page

### Code Won't Run
- Ensure Pyodide shows "Python environment ready!"
- Check browser console for errors
- Verify code syntax is correct

### Authentication Issues
- Clear browser cache and sessionStorage
- Check password in `auth.js`
- Try incognito/private mode

### Flags Not Appearing
- Ensure exact answer match (case-sensitive for some)
- For coding: output must match exactly
- Check hint if stuck

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Mobile browsers (limited code editor)

## 🎯 Grading Suggestions

**Point Distribution:**
- Easy: 10 points each (100 total)
- Medium: 20 points each (400 total)
- Hard: 30 points each (300 total)
- **Total: 800 points**

**Suggested Grading Scale:**
- A: 640+ points (80%+)
- B: 560+ points (70%+)
- C: 480+ points (60%+)
- D: 400+ points (50%+)

## 📞 Support

**Instructor:** Mr. Eremas Tade  
**Unit:** CMN322 - Internet of Things  
**Institution:** Western Pacific University  
**Semester:** 2, 2025

## 📄 License

Educational use only. Content adapted from:
- Cisco Networking Academy (NetAcad)
- IoT Connecting Things course
- IoT Big Data and Analytics course

## 🙏 Acknowledgements

Lecture content incorporates material from:
- Cisco Systems, Inc. © All rights reserved
- Western Pacific University CMN322 curriculum

---

**Good luck to all students! 🎯**

*Prepared by: Mr. Eremas Tade | Week 15, 2025*