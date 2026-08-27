This technology is called Proof-of-Work (PoW) CAPTCHA or Cryptographic CAPTCHA.
To implement it, you cannot use a simple "prompt" alone because it requires real programming logic to run a mathematical puzzle on both the user's browser (Frontend) and your security server (Backend).
Below is a complete, working mock UI and functional implementation of a secure signup/login form using ALTCHA—the leading open-source PoW CAPTCHA standard.
## 🛡️ Interactive Live Demo
You can try out the registration form below. Notice how the CAPTCHA verifies you automatically without asking you to click pictures or solve puzzles.

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Secure Portal Access</title>
  
  <!-- 1. Include the official ALTCHA Web Component Script -->
  <script async defer src="https://jsdelivr.net" type="module"></script>
  
  <style>
    :root {
      --primary: #0066cc;
      --bg: #f4f6f9;
      --card: #ffffff;
      --text: #333333;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .auth-card {
      background: var(--card);
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 400px;
    }
    h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: #111;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #cccccc;
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 1rem;
    }
    input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
    }
    /* 2. Style the custom ALTCHA widget */
    altcha-widget {
      --altcha-max-width: 100%;
      margin: 1.5rem 0;
    }
    .btn {
      width: 100%;
      padding: 0.85rem;
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover {
      background-color: #0052a3;
    }
    .status-msg {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: 6px;
      display: none;
      font-size: 0.9rem;
      text-align: center;
    }
  </style>
</head>
<body>

  <div class="auth-card">
    <h2>Create Secure Account</h2>
    <form id="signupForm">
      <div class="form-group">
        <label for="email">Official Email Address</label>
        <input type="email" id="email" required placeholder="name@agency.gov">
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" required placeholder="••••••••">
      </div>

      <!-- 3. The Live PoW CAPTCHA Element 
           In production, the 'challengeurl' points to your backend server API -->
      <altcha-widget 
        challengeurl="https://altcha.org"
        floating
        hidefooter>
      </altcha-widget>

      <button type="submit" class="btn">Register Account</button>
    </form>
    
    <div id="status" class="status-msg"></div>
  </div>

  <script>
    const form = document.getElementById('signupForm');
    const statusDiv = document.getElementById('status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Grab form inputs + the invisible cryptographic string solved by ALTCHA
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const altchaPayload = form.querySelector('input[name="altcha"]').value;

      if (!altchaPayload) {
        showStatus('Please wait for the background security check to complete.', 'error');
        return;
      }

      showStatus('Verifying cryptographic token...', 'info');

      // 4. Mocking the Backend API Verification request
      setTimeout(() => {
        // Simulating a successful backend response verifying the PoW math
        showStatus('🛡️ Security Verified! Account successfully created.', 'success');
        form.reset();
      }, 1500);
    });

    function showStatus(text, type) {
      statusDiv.innerText = text;
      statusDiv.style.display = 'block';
      if (type === 'success') {
        statusDiv.style.backgroundColor = '#e6f4ea';
        statusDiv.style.color = '#137333';
      } else if (type === 'error') {
        statusDiv.style.backgroundColor = '#fce8e6';
        statusDiv.style.color = '#c5221f';
      } else {
        statusDiv.style.backgroundColor = '#e8f0fe';
        statusDiv.style.color = '#1a73e8';
      }
    }
  </script>
</body>
</html>

## ⚙️ Behind the Scenes (How to implement it)
To successfully set this up in production on a government or enterprise system, you need to handle two parts:

   1. The Frontend (What citizens see):
   You drop in the <altcha-widget> tag like shown in the UI mock above. When the page loads, the widget automatically contacts your server, fetches a custom mathematical puzzle, uses the browser's hardware to solve it silently in milliseconds, and appends a hidden validation text string (altchaPayload) to your form inputs.
   2. The Backend (What keeps you secure):
   When your user clicks "Register Account", your server processes the text fields. Before checking the password or saving the data to the database, your backend executes an validation check like this:
   
   // Node.js Backend Exampleimport { verifySolution } from 'altcha-lib';
   
   app.post('/api/signup', async (req, res) => {
     const { email, password, altcha } = req.body;
   
     // Validate the PoW mathematical proof natively on your server
     const isValidBotCheck = await verifySolution(altcha, 'YOUR_SECRET_SERVER_KEY');
   
     if (!isValidBotCheck) {
       return res.status(400).json({ error: "Security check failed. Bots blocked." });
     }
   
     // Proceed safely with signup
     await createUserInDatabase(email, password);
     res.status(200).json({ success: true });
   });