function validatename(str) {
    const spanEle = document.getElementById("n");
    //Clear message if empty
    if(str.trim()==="") {
      spanEle.innerHTML="";
      return false;
    }
  
    let flag=true;
  
    // Space not allowed
    if(str.includes(" ")) {
      flag=false;
    }
  
    // Allow all characters except space
    for(let i=0; i<str.length; i++) {
      let ch=str.charCodeAt(i);
      if (ch===32) {
        flag=false;
        break;
      }
    }
  
    //  error if invalid
    if(!flag) {
      spanEle.style.color="red";
      spanEle.innerHTML="space not allowed";
    } else {
      spanEle.innerHTML=""; //Valid input 
    }
  
    return flag;
  }
  

  //Email validation

  function validateemail(str) {
    const spanEle=document.getElementById("e");
  
    // if input empty, hide message
    if (str.trim()==="") {
      spanEle.innerHTML="";
      return false;
    }
  
    const atIndex=str.indexOf("@");
    const lastAtIndex=str.lastIndexOf("@");
  
    // Must have one @ and not at start/end
    if (atIndex<=0 || atIndex!==lastAtIndex || atIndex===str.length-1) {
      spanEle.innerHTML="invalid email";
      spanEle.style.color="red";
      return false;
    }
  
    const [localPart, domainPart] = str.split("@");
  
    // Domain must be exactly gmail.com
    if (domainPart!=="gmail.com") {
      spanEle.innerHTML="only gmail.com allowed";
      spanEle.style.color="red";
      return false;
    }
  
    // Validate local part
    for (let i=0; i<localPart.length; i++) {
      const ch=localPart.charCodeAt(i);
      if (
        !(
          (ch>=97 && ch<=122) || // a-z
          (ch>=48 && ch<=57) ||  // 0-9
          ch===95 ||               // _
          ch===46                  // .
        )
      ) {
        spanEle.innerHTML="invalid characters in email";
        spanEle.style.color="red";
        return false;
      }
    }
    // All checks passed
    spanEle.innerHTML = ""; // no green message
    return true;
  }
  
    //validate password
    function validatePass(str) {
        const spanEle=document.getElementById("pass");
      
        // If input is empty, hide message
        if (str.trim()==="") {
          spanEle.innerHTML="";
          return false;
        }
      
        let flag=true;
      
        // Must be at least 8 characters and no spaces
        if (str.length<8 || str.includes(" ")) {
          flag=false;
        }
      
        let hasDigit=false,
            hasUpper=false,
            hasLower=false,
            hasSpecial=false;
      
        for(let i=0; i<str.length; i++) {
          let ch=str.charCodeAt(i);
          if (ch>=48 && ch<=57) hasDigit=true;
          else if (ch>=65 && ch<=90) hasUpper=true;
          else if (ch>=97 && ch<=122) hasLower=true;
          else hasSpecial=true;
        }
      
        // ❌ If any condition is not met
        if (!(hasDigit && hasUpper && hasLower && hasSpecial)) {
          flag=false;
        }
      
        if (!flag) {
          spanEle.style.color="red";
          spanEle.innerHTML="invalid password";
        } else {
          spanEle.innerHTML=""; // Hide success message
        }
      
        return flag;
      }

    // Form validation on submit
    function validateForm() {
    const name=document.getElementById("username").value.trim();
    const email=document.getElementById("email").value.trim();
    const pass=document.getElementById("password").value;

    const nameValid=validatename(name);
    const emailValid=validateemail(email);
    const passValid=validatePass(pass);

    return nameValid && emailValid && passValid;
    }
