const fs = require('fs');
const path = require('path');

const template = (title, description, content, breadcrumb = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <title>${title} - QuickServe IT</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
  <link rel="stylesheet" href="/assets/css/main.css">
  <link rel="stylesheet" href="/assets/css/components.css">
</head>
<body>
  <div id="header-placeholder"></div>
  
  <main style="margin-top: 100px; min-height: 70vh;">
    <div class="container">
      ${breadcrumb}
      ${content}
    </div>
  </main>
  
  <div id="footer-placeholder"></div>
  
  <script src="/assets/js/main.js"></script>
  <script>
    fetch('/components/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        if (window.QuickServeIT) initNavigation();
      });
    
    fetch('/components/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
      });
  </script>
</body>
</html>`;

const pages = {
  // Service Pages
  'pages/services/laptop-service.html': {
    title: 'Laptop Service & Repair',
    description: 'Professional laptop repair and maintenance services. Screen replacement, battery issues, keyboard repair, and more.',
    content: `
      <div class="section">
        <h1 class="text-gradient">🖥️ Laptop Service & Repair</h1>
        <p class="section-subtitle">Professional Laptop Maintenance and Repair Services</p>
        
        <div class="grid grid-2 mt-4">
          <div>
            <h2>Our Laptop Services</h2>
            <ul style="list-style: none; padding: 0;">
              <li class="card mb-1">🖥️ Screen Replacement & Repair</li>
              <li class="card mb-1">🔋 Battery Replacement</li>
              <li class="card mb-1">⌨️ Keyboard Repair & Replacement</li>
              <li class="card mb-1">🔌 Charging Port Repair</li>
              <li class="card mb-1">💾 SSD/HDD Upgrade</li>
              <li class="card mb-1">🎮 RAM Upgrade</li>
              <li class="card mb-1">🌡️ Cooling System Cleaning</li>
              <li class="card mb-1">🔊 Speaker & Audio Repair</li>
            </ul>
          </div>
          
          <div class="card">
            <h3 class="text-gold">Service Highlights</h3>
            <p>✅ All Brands Supported</p>
            <p>✅ Genuine Parts Available</p>
            <p>✅ Quick Turnaround Time</p>
            <p>✅ Warranty on Repairs</p>
            <p>✅ Free Pickup & Delivery</p>
            <p>✅ Data Backup Service</p>
            
            <div class="mt-3">
              <h4 class="text-gold">Starting from ₹599</h4>
              <a href="/pages/contact.html" class="btn btn-primary mt-2" style="width: 100%;">Book Service Now</a>
            </div>
          </div>
        </div>
      </div>
    `
  },
  
  'pages/services/data-recovery.html': {
    title: 'Data Recovery Services',
    description: 'Professional data recovery from hard drives, SSDs, USB drives, and memory cards. Recover your lost files safely.',
    content: `
      <div class="section">
        <h1 class="text-gradient">💾 Data Recovery Services</h1>
        <p class="section-subtitle">Recover Your Lost Data Safely and Securely</p>
        
        <div class="card mt-4">
          <h2>We Recover Data From:</h2>
          <div class="grid grid-4 mt-2">
            <div class="text-center"><h3>💽</h3><p>Hard Drives</p></div>
            <div class="text-center"><h3>💿</h3><p>SSDs</p></div>
            <div class="text-center"><h3>📱</h3><p>Mobile Phones</p></div>
            <div class="text-center"><h3>💾</h3><p>USB Drives</p></div>
            <div class="text-center"><h3>📷</h3><p>Memory Cards</p></div>
            <div class="text-center"><h3>💻</h3><p>Laptops</p></div>
            <div class="text-center"><h3>🖥️</h3><p>Desktops</p></div>
            <div class="text-center"><h3>☁️</h3><p>Cloud Storage</p></div>
          </div>
        </div>
        
        <div class="grid grid-2 mt-4">
          <div class="card">
            <h3>Common Data Loss Scenarios</h3>
            <p>🗑️ Accidental Deletion</p>
            <p>💥 Hard Drive Crash</p>
            <p>🦠 Virus Attack</p>
            <p>⚡ Power Failure</p>
            <p>🔥 Physical Damage</p>
            <p>💧 Water Damage</p>
            <p>🔄 Formatting Error</p>
            <p>🚫 Corrupted Files</p>
          </div>
          
          <div class="card">
            <h3>Our Recovery Process</h3>
            <p>1️⃣ Free Evaluation</p>
            <p>2️⃣ Diagnosis & Quote</p>
            <p>3️⃣ Data Recovery</p>
            <p>4️⃣ Verification</p>
            <p>5️⃣ Secure Delivery</p>
            <p class="mt-3 text-gold">✅ No Data, No Charge Policy</p>
            <p class="text-gold">✅ 100% Confidential</p>
            <a href="/pages/contact.html" class="btn btn-primary mt-3" style="width: 100%;">Get Free Evaluation</a>
          </div>
        </div>
      </div>
    `
  },
  
  'pages/services/network-setup.html': {
    title: 'Network Setup & Configuration',
    description: 'Professional network installation, WiFi setup, router configuration, and network security services.',
    content: `
      <div class="section">
        <h1 class="text-gradient">🌐 Network Setup & Configuration</h1>
        <p class="section-subtitle">Complete Network Solutions for Home and Office</p>
        
        <div class="grid grid-3 mt-4">
          <div class="card">
            <h3>🏠 Home Network</h3>
            <p>WiFi Router Setup</p>
            <p>Range Extenders</p>
            <p>Smart Home Integration</p>
            <p>Parental Controls</p>
            <p>Guest Network Setup</p>
          </div>
          
          <div class="card">
            <h3>🏢 Office Network</h3>
            <p>LAN/WAN Setup</p>
            <p>Server Configuration</p>
            <p>Network Security</p>
            <p>VPN Setup</p>
            <p>Firewall Configuration</p>
          </div>
          
          <div class="card">
            <h3>🔒 Security</h3>
            <p>Network Encryption</p>
            <p>Access Control</p>
            <p>Intrusion Detection</p>
            <p>Security Audits</p>
            <p>Monitoring Setup</p>
          </div>
        </div>
        
        <div class="card mt-4 text-center">
          <h2>Professional Network Installation</h2>
          <p>Starting from ₹999</p>
          <a href="/pages/contact.html" class="btn btn-primary mt-2">Request Quote</a>
        </div>
      </div>
    `
  },
  
  'pages/services/software-installation.html': {
    title: 'Software Installation & Configuration',
    description: 'Professional software installation, OS setup, application configuration, and software troubleshooting.',
    content: `
      <div class="section">
        <h1 class="text-gradient">📦 Software Installation & Configuration</h1>
        <p class="section-subtitle">Expert Software Setup and Configuration Services</p>
        
        <div class="grid grid-2 mt-4">
          <div class="card">
            <h3>Operating Systems</h3>
            <p>🪟 Windows Installation</p>
            <p>🍎 macOS Setup</p>
            <p>🐧 Linux Installation</p>
            <p>🔄 OS Upgrades</p>
            <p>⚙️ Driver Installation</p>
          </div>
          
          <div class="card">
            <h3>Business Software</h3>
            <p>📊 Microsoft Office</p>
            <p>💼 Accounting Software</p>
            <p>🎨 Adobe Creative Suite</p>
            <p>📧 Email Clients</p>
            <p>☁️ Cloud Applications</p>
          </div>
        </div>
        
        <div class="card mt-4">
          <h3>We Install & Configure:</h3>
          <div class="grid grid-4 mt-2">
            <p>✅ Antivirus Software</p>
            <p>✅ Productivity Tools</p>
            <p>✅ Design Software</p>
            <p>✅ Development Tools</p>
            <p>✅ Media Players</p>
            <p>✅ Browsers</p>
            <p>✅ Backup Software</p>
            <p>✅ Custom Applications</p>
          </div>
          <div class="text-center mt-3">
            <h4 class="text-gold">Starting from ₹299</h4>
            <a href="/pages/contact.html" class="btn btn-primary mt-2">Book Service</a>
          </div>
        </div>
      </div>
    `
  },
  
  'pages/services/virus-removal.html': {
    title: 'Virus & Malware Removal',
    description: 'Complete virus removal, malware cleaning, and system security services. Protect your computer from threats.',
    content: `
      <div class="section">
        <h1 class="text-gradient">🛡️ Virus & Malware Removal</h1>
        <p class="section-subtitle">Complete Protection Against Digital Threats</p>
        
        <div class="card mt-4">
          <h2>Signs Your Computer is Infected</h2>
          <div class="grid grid-3 mt-2">
            <p>🐌 Slow Performance</p>
            <p>🚨 Pop-up Ads</p>
            <p>🔄 Unexpected Restarts</p>
            <p>📧 Spam Emails Sent</p>
            <p>🔒 Files Encrypted</p>
            <p>🌐 Browser Redirects</p>
            <p>💾 Disk Space Issues</p>
            <p>🔇 Programs Not Working</p>
            <p>🚫 Antivirus Disabled</p>
          </div>
        </div>
        
        <div class="grid grid-2 mt-4">
          <div class="card">
            <h3>Our Removal Process</h3>
            <p>1️⃣ System Scan & Analysis</p>
            <p>2️⃣ Threat Identification</p>
            <p>3️⃣ Virus Removal</p>
            <p>4️⃣ System Cleaning</p>
            <p>5️⃣ Security Setup</p>
            <p>6️⃣ Prevention Tips</p>
          </div>
          
          <div class="card">
            <h3>We Remove:</h3>
            <p>🦠 Viruses</p>
            <p>🐛 Worms</p>
            <p>🐴 Trojans</p>
            <p>🕵️ Spyware</p>
            <p>📢 Adware</p>
            <p>🔒 Ransomware</p>
            <p>🎣 Phishing Threats</p>
            <p>🤖 Rootkits</p>
          </div>
        </div>
        
        <div class="card mt-4 text-center">
          <h2>Complete Virus Removal</h2>
          <p class="text-gold">Starting from ₹499</p>
          <p>✅ Same Day Service | ✅ Data Protection | ✅ Prevention Setup</p>
          <a href="/pages/contact.html" class="btn btn-primary mt-2">Get Help Now</a>
        </div>
      </div>
    `
  },
  
  'pages/services/web-development.html': {
    title: 'Web Development Services',
    description: 'Custom website design and development. Responsive, modern, and SEO-friendly websites for your business.',
    content: `
      <div class="section">
        <h1 class="text-gradient">🌟 Web Development Services</h1>
        <p class="section-subtitle">Custom Websites That Drive Results</p>
        
        <div class="grid grid-3 mt-4">
          <div class="card">
            <h3>🎨 Design</h3>
            <p>Modern UI/UX</p>
            <p>Responsive Design</p>
            <p>Brand Identity</p>
            <p>Custom Graphics</p>
            <p>User-Friendly</p>
          </div>
          
          <div class="card">
            <h3>💻 Development</h3>
            <p>HTML/CSS/JS</p>
            <p>React/Vue/Angular</p>
            <p>WordPress/CMS</p>
            <p>E-commerce</p>
            <p>Custom Solutions</p>
          </div>
          
          <div class="card">
            <h3>🚀 Features</h3>
            <p>Fast Loading</p>
            <p>SEO Optimized</p>
            <p>Mobile Friendly</p>
            <p>Secure</p>
            <p>Scalable</p>
          </div>
        </div>
        
        <div class="card mt-4">
          <h2>Website Packages</h2>
          <div class="grid grid-3 mt-2">
            <div class="text-center">
              <h3 class="text-gold">Basic</h3>
              <h4>₹9,999</h4>
              <p>5 Pages</p>
              <p>Responsive Design</p>
              <p>Contact Form</p>
              <p>1 Year Support</p>
            </div>
            <div class="text-center">
              <h3 class="text-gold">Professional</h3>
              <h4>₹24,999</h4>
              <p>10 Pages</p>
              <p>CMS Integration</p>
              <p>SEO Setup</p>
              <p>2 Years Support</p>
            </div>
            <div class="text-center">
              <h3 class="text-gold">Enterprise</h3>
              <h4>₹49,999+</h4>
              <p>Unlimited Pages</p>
              <p>Custom Features</p>
              <p>Advanced SEO</p>
              <p>Lifetime Support</p>
            </div>
          </div>
          <div class="text-center mt-3">
            <a href="/pages/contact/quote.html" class="btn btn-primary">Get Custom Quote</a>
          </div>
        </div>
      </div>
    `
  },
  
  'pages/services/digital-marketing.html': {
    title: 'Digital Marketing Services',
    description: 'SEO, social media marketing, content marketing, and online advertising services to grow your business.',
    content: `
      <div class="section">
        <h1 class="text-gradient">📱 Digital Marketing Services</h1>
        <p class="section-subtitle">Grow Your Business Online</p>
        
        <div class="grid grid-4 mt-4">
          <div class="card text-center">
            <h3>🔍</h3>
            <h4>SEO</h4>
            <p>Search Engine Optimization</p>
          </div>
          <div class="card text-center">
            <h3>📱</h3>
            <h4>Social Media</h4>
            <p>Facebook, Instagram, Twitter</p>
          </div>
          <div class="card text-center">
            <h3>📧</h3>
            <h4>Email Marketing</h4>
            <p>Campaigns & Automation</p>
          </div>
          <div class="card text-center">
            <h3>📊</h3>
            <h4>Analytics</h4>
            <p>Performance Tracking</p>
          </div>
        </div>
        
        <div class="card mt-4">
          <h2>Our Digital Marketing Services</h2>
          <div class="grid grid-2 mt-2">
            <div>
              <h4>✅ Search Engine Optimization (SEO)</h4>
              <h4>✅ Social Media Marketing</h4>
              <h4>✅ Content Marketing</h4>
              <h4>✅ Pay-Per-Click (PPC) Advertising</h4>
            </div>
            <div>
              <h4>✅ Email Marketing Campaigns</h4>
              <h4>✅ Brand Strategy</h4>
              <h4>✅ Online Reputation Management</h4>
              <h4>✅ Analytics & Reporting</h4>
            </div>
          </div>
          <div class="text-center mt-3">
            <h3 class="text-gold">Starting from ₹4,999/month</h3>
            <a href="/pages/contact.html" class="btn btn-primary mt-2">Start Growing Today</a>
          </div>
        </div>
      </div>
    `
  }
};

// Generate all pages
Object.entries(pages).forEach(([filepath, data]) => {
  const fullPath = path.join(__dirname, filepath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const html = template(data.title, data.description, data.content);
  fs.writeFileSync(fullPath, html);
  console.log(`Created: ${filepath}`);
});

console.log('Service pages generated successfully!');
