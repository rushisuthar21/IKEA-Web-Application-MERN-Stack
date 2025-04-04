// validation.js

document.addEventListener("DOMContentLoaded", function () {
    // ========== 🔁 Product Image Type Toggle ==========
    const imageTypeSelect = document.querySelector('select[name="imageType"]');
    const urlInputGroup = document.querySelector('#imageUrlGroup');
    const fileInputGroup = document.querySelector('#imageUploadGroup');
    const urlInput = document.querySelector('#imageUrl');
    const fileInput = document.querySelector('#imageFile');
  
    if (imageTypeSelect) {
      const toggleImageInputs = () => {
        const selected = imageTypeSelect.value;
        if (selected === 'url') {
          urlInputGroup.classList.remove('d-none');
          fileInputGroup.classList.add('d-none');
          if (urlInput) urlInput.required = true;
          if (fileInput) fileInput.required = false;
        } else {
          fileInputGroup.classList.remove('d-none');
          urlInputGroup.classList.add('d-none');
          if (urlInput) urlInput.required = false;
          if (fileInput) fileInput.required = true;
        }
      };
  
      imageTypeSelect.addEventListener('change', toggleImageInputs);
      toggleImageInputs(); // On page load
    }
  
    // ========== 📞 Phone Validation ==========
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.setAttribute("pattern", "[0-9]{10}");
      phoneInput.setAttribute("title", "Please enter a 10-digit phone number");
    }
  
    // ========== 🔐 Password Field Validation ==========
    const passwordInput = document.querySelector('input[name="password"]');
    if (passwordInput) {
      passwordInput.setAttribute("minlength", "6");
      passwordInput.setAttribute("title", "Password must be at least 6 characters");
    }
  
    // ========== 🧾 Register Form Validation ==========
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        let isValid = true;
        let messages = [];
  
        const name = registerForm.name.value.trim();
        const email = registerForm.email.value.trim();
        const password = registerForm.password.value;
        const address = registerForm.address.value.trim();
  
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!name) messages.push('Full name is required.');
        if (!emailPattern.test(email)) messages.push('Please enter a valid email address.');
        if (password.length < 6) messages.push('Password must be at least 6 characters.');
        if (!address) messages.push('Address is required.');
  
        if (messages.length > 0) {
          e.preventDefault();
          alert(messages.join('\n'));
        }
      });
    }
  
    // ========== 🔑 Login Form Validation ==========
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        let messages = [];
  
        const email = loginForm.email.value.trim();
        const password = loginForm.password.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!emailPattern.test(email)) messages.push('Enter a valid email address.');
        if (password.length < 6) messages.push('Password must be at least 6 characters.');
  
        if (messages.length > 0) {
          e.preventDefault();
          alert(messages.join('\n'));
        }
      });
    }

    // ========== 🛒 Checkout Form Validation ==========
const checkoutForm = document.querySelector('#checkoutForm');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', function (e) {
    const email = checkoutForm.email.value.trim();
    const name = checkoutForm.name.value.trim();
    const phone = checkoutForm.phone.value.trim();
    const address = checkoutForm.address.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const errors = [];

    if (!name) errors.push('Name is required.');
    if (!emailPattern.test(email)) errors.push('Please enter a valid email address.');
    if (!phonePattern.test(phone)) errors.push('Please enter a valid 10-digit phone number.');
    if (!address) errors.push('Address is required.');

    if (errors.length > 0) {
      e.preventDefault();
      alert(errors.join('\n'));
    }
  });
}

  
    // ========== 💳 Payment Form Validation ==========
    const paymentForm = document.querySelector('#paymentForm');
    if (paymentForm) {
      paymentForm.addEventListener('submit', function (e) {
        let messages = [];
  
        const cardNumber = paymentForm.cardNumber.value.trim();
        const expiry = paymentForm.expiry.value.trim();
        const cvv = paymentForm.cvv.value.trim();
  
        if (!/^\d{16}$/.test(cardNumber)) messages.push('Card number must be 16 digits.');
        if (!/^\d{3}$/.test(cvv)) messages.push('CVV must be 3 digits.');
  
        const [mm, yy] = expiry.split('/');
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear() % 100;
  
        if (!mm || !yy || isNaN(mm) || isNaN(yy)) {
          messages.push('Expiry must be in MM/YY format.');
        } else {
          const month = parseInt(mm);
          const year = parseInt(yy);
          if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
            messages.push('Card expiry must be in the future.');
          }
        }
  
        if (messages.length > 0) {
          e.preventDefault();
          alert(messages.join('\n'));
        }
      });
    }
  });
  