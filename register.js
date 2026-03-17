// دالة التحقق من صحة نموذج التسجيل
function validateRegisterForm() {
  console.log('✅ Checking form...');
  
  const fullName = document.getElementById('regFullName')?.value.trim();
  const nationalId = document.getElementById('regNationalId')?.value.trim();
  const governorate = document.getElementById('regGovernorate')?.value;
  const phone = document.getElementById('regPhone')?.value.trim();
  const password = document.getElementById('regPassword')?.value;
  const confirmPassword = document.getElementById('regConfirmPassword')?.value;
  
  const errorDiv = document.getElementById('registerError');
  const errorSpan = errorDiv?.querySelector('span');
  const passwordMatchError = document.getElementById('passwordMatchError');
  
  // إخفاء رسائل الخطأ السابقة
  if (errorDiv) errorDiv.style.display = 'none';
  if (passwordMatchError) passwordMatchError.style.display = 'none';
  
  // التحقق من اختيار محافظة
  if (!governorate) {
    if (errorDiv && errorSpan) {
      errorSpan.textContent = 'Please select a governorate';
      errorDiv.style.display = 'block';
    }
    return false;
  }
  
  // التحقق من ملء جميع الحقول
  if (!fullName || !nationalId || !phone || !password || !confirmPassword) {
    if (errorDiv && errorSpan) {
      errorSpan.textContent = 'All fields are required';
      errorDiv.style.display = 'block';
    }
    return false;
  }
  
  // التحقق من أن رقم الهاتف يحتوي على أرقام فقط
  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(phone)) {
    if (errorDiv && errorSpan) {
      errorSpan.textContent = 'Phone number must contain only numbers';
      errorDiv.style.display = 'block';
    }
    return false;
  }
  
  // التحقق من أن رقم الهاتف مكون من 11 رقم
  if (phone.length !== 11) {
    if (errorDiv && errorSpan) {
      errorSpan.textContent = 'Phone number must be 11 digits';
      errorDiv.style.display = 'block';
    }
    return false;
  }
  
  // التحقق من أن الرقم القومي 14 رقم
  if (nationalId.length !== 14 || !phoneRegex.test(nationalId)) {
    if (errorDiv && errorSpan) {
      errorSpan.textContent = 'National ID must be 14 digits';
      errorDiv.style.display = 'block';
    }
    return false;
  }
  
  // التحقق من تطابق كلمة المرور
  if (password !== confirmPassword) {
    if (passwordMatchError) {
      passwordMatchError.style.display = 'block';
    }
    return false;
  }
  
  // التحقق من أن كلمة المرور على الأقل 6 أحرف
  if (password.length < 6) {
    if (errorDiv && errorSpan) {
      errorSpan.textContent = 'Password must be at least 6 characters';
      errorDiv.style.display = 'block';
    }
    return false;
  }
  
  // حفظ بيانات المستخدم
  const userData = {
    fullName: fullName,
    nationalId: nationalId,
    governorate: governorate,
    phone: phone
  };
  localStorage.setItem('ursa_user', JSON.stringify(userData));
  
  // إذا كل حاجة تمام
  alert('🎉 Account created successfully!\nWelcome to URSA');
  
  // ========== التعديل الحاسم هنا ==========
  // إخفاء كل الصفحات
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active-page');
  });
  
  // إظهار صفحة Home فقط
  document.getElementById('page-home').classList.add('active-page');
  
  // إزالة كلاس login-page من body
  document.body.classList.remove('login-page');
  
  return true;
}