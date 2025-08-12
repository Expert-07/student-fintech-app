import React, { useState } from "react";

// Inline style from sign up (all in one).html
const style = `
:root {
    --primary: #00ffff;
    --primary-light: #00e6e6;
    --secondary: #0000ff;
    --accent: #00ccff;
    --success: #00ff99;
    --warning: #ffcc00;
    --danger: #ff3366;
    --dark-bg: #121212;
    --card-bg: #1a1a1a;
    --text-color: #e0e0e0;
    --text-secondary: #a0a0a0;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
body, .register-bg { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: var(--text-color); min-height: 100vh; }
.container { width: 100%; max-width: 1200px; margin: 0 auto; }
.signup-container { display: grid; grid-template-columns: 1fr 1fr; background: rgba(26, 26, 26, 0.9); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); min-height: 650px; position: relative; z-index: 10; }
@media (max-width: 992px) { .signup-container { grid-template-columns: 1fr; } }
.signup-illustration { background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; text-align: center; position: relative; overflow: hidden; }
.logo { display: flex; align-items: center; gap: 10px; font-size: 2.5rem; font-weight: bold; margin-bottom: 2rem; z-index: 1; }
.logo .ske { color: #fff; font-weight: 800; text-shadow: 0 0 8px rgba(0,255,255,0.7); }
.logo .mart { color: var(--primary); font-weight: 600; }
.logo i { color: var(--primary); font-size: 2.5rem; }
.illustration-img { width: 80%; max-width: 400px; margin-bottom: 2rem; z-index: 1; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3)); }
.illustration-text { font-size: 1.5rem; max-width: 400px; margin-bottom: 2rem; z-index: 1; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
.features { display: flex; gap: 1.5rem; z-index: 1; flex-wrap: wrap; justify-content: center; }
.feature { background: rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem; min-width: 120px; text-align: center; backdrop-filter: blur(5px); }
.feature i { font-size: 2rem; margin-bottom: 0.5rem; color: var(--primary); }
.signup-form { padding: 3rem; display: flex; flex-direction: column; justify-content: center; }
.signup-header { margin-bottom: 2rem; text-align: center; }
.signup-header h1 { font-size: 2.5rem; color: var(--primary); margin-bottom: 0.5rem; }
.signup-header p { color: var(--text-secondary); font-size: 1.1rem; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 500; }
.form-group .input-with-icon { position: relative; }
.form-group .input-with-icon i { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--primary); }
.form-group input, .form-group select { width: 100%; padding: 0.8rem 1rem 0.8rem 45px; border-radius: 8px; background: #2d2d2d; border: 1px solid #3d3d3d; color: var(--text-color); font-size: 1rem; transition: all 0.3s ease; }
.form-group input:focus, .form-group select:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 2px rgba(0,255,255,0.2); }
.form-row { display: flex; gap: 1rem; }
.form-row .form-group { flex: 1; }
.terms { display: flex; align-items: flex-start; margin-bottom: 1.5rem; }
.terms input { margin-top: 5px; margin-right: 10px; }
.terms label { font-size: 0.9rem; color: var(--text-secondary); }
.terms a { color: var(--primary); text-decoration: none; }
.terms a:hover { text-decoration: underline; }
.btn { padding: 1rem; border-radius: 8px; border: none; background: var(--primary); color: #121212; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; justify-content: center; gap: 10px; font-size: 1.1rem; width: 100%; }
.btn:hover { background: var(--primary-light); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,255,255,0.3); }
.or-divider { display: flex; align-items: center; margin: 1.5rem 0; }
.or-divider .line { flex: 1; height: 1px; background: #3d3d3d; }
.or-divider .text { padding: 0 1rem; color: var(--text-secondary); }
.social-login { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
.social-btn { flex: 1; padding: 0.8rem; border-radius: 8px; border: 1px solid #3d3d3d; background: #2d2d2d; color: var(--text-color); cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px; }
.social-btn:hover { background: rgba(0,255,255,0.1); border-color: var(--primary); }
.login-link { text-align: center; margin-top: 1.5rem; color: var(--text-secondary); }
.login-link a { color: var(--primary); text-decoration: none; font-weight: 600; }
.login-link a:hover { text-decoration: underline; }
@media (max-width: 992px) { .signup-container { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .signup-container { min-height: auto; } .signup-illustration { padding: 2rem 1rem; } .signup-form { padding: 2rem; } .form-row { flex-direction: column; gap: 0; } .social-login { flex-direction: column; } .logo { font-size: 2rem; } .illustration-text { font-size: 1.2rem; } }
@media (max-width: 480px) { body { padding: 1rem; } .signup-form { padding: 1.5rem; } .signup-header h1 { font-size: 2rem; } }
`;

export default function RegisterTemplate() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentType: '',
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.agree) {
      alert('You must agree to the Terms and Privacy Policy.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          studentType: form.studentType,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Registration failed');
        setLoading(false);
        return;
      }
      alert('🎉 Registration successful!');
      // Optionally redirect here
    } catch (err) {
      alert('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-bg" style={{ minHeight: '100vh' }}>
      <style>{style}</style>
      <div className="container">
        <div className="signup-container">
          {/* Left Side - Illustration */}
          <div className="signup-illustration fade-in">
            <div className="logo floating">
              <i className="fas fa-graduation-cap"></i>
              <span className="ske">Student</span><span className="mart">Assist</span>
            </div>
            <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop" alt="Student Illustration" className="illustration-img" />
            <p className="illustration-text">Join thousands of students mastering their academic and financial journey</p>
            <div className="features">
              <div className="feature">
                <i className="fas fa-book"></i>
                <p>Study Planner</p>
              </div>
              <div className="feature">
                <i className="fas fa-wallet"></i>
                <p>Finance Tracker</p>
              </div>
              <div className="feature">
                <i className="fas fa-trophy"></i>
                <p>Achievements</p>
              </div>
            </div>
          </div>
          {/* Right Side - Form */}
          <div className="signup-form fade-in">
            <div className="signup-header">
              <h1>Create Account</h1>
              <p>Get started on your academic journey today</p>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-with-icon">
                    <i className="fas fa-user"></i>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter your first name" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-with-icon">
                    <i className="fas fa-user"></i>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter your last name" required />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" required />
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                </div>
              </div>
              <div className="form-group">
                <label>Student Type</label>
                <div className="input-with-icon">
                  <i className="fas fa-graduation-cap"></i>
                  <select name="studentType" value={form.studentType} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 45px', borderRadius: 8, background: '#2d2d2d', border: '1px solid #3d3d3d', color: 'var(--text-color)', fontSize: '1rem', appearance: 'none' }}>
                    <option value="">Select your student type</option>
                    <option value="highschool">High School</option>
                    <option value="undergrad">Undergraduate</option>
                    <option value="grad">Graduate</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="terms">
                <input type="checkbox" name="agree" id="terms" checked={form.agree} onChange={handleChange} required />
                <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
              </div>
              <button className="btn" type="submit" disabled={loading}>
                <i className="fas fa-user-plus"></i> {loading ? 'Registering...' : 'Create Account'}
              </button>
              <div className="or-divider">
                <div className="line"></div>
                <div className="text">OR</div>
                <div className="line"></div>
              </div>
              <div className="social-login">
                <button className="social-btn" type="button">
                  <i className="fab fa-google"></i> Google
                </button>
                <button className="social-btn" type="button">
                  <i className="fab fa-facebook-f"></i> Facebook
                </button>
              </div>
              <div className="login-link">
                Already have an account? <a href="/login">Log in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
