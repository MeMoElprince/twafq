export function handleLoginInfo(formData, setErrorMessage) {
  let errorMessage = [];

  // Check if gender is selected
  if (
    !formData.gender ||
    formData.gender[0] === "" ||
    formData.gender[1] === ""
  ) {
    errorMessage.push(["يرجى اختيار الجنس", "Please select gender"]);
  }

  // Check if phone is provided
  if (!formData.phone || formData.phone.trim() === "") {
    errorMessage.push(["يرجى إدخال رقم الهاتف", "Please enter a phone number"]);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if email contains '@'
  if (!formData.email || !emailRegex.test(formData.email)) {
    errorMessage.push([
      "يرجى إدخال البريد الإلكتروني بشكل صحيح",
      "Please enter a valid email address",
    ]);
  }

  let test = 0;

  // Check if password is at least 8 characters long and contains both letters and digits
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
  if (!formData.password || !passwordRegex.test(formData.password)) {
    test = 1;
    errorMessage.push([
      "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على أرقام وأحرف",
      "Password must be at least 8 characters long and contain both letters and digits",
    ]);
  }

  // Check if confirmPassword matches password
  if (formData.confirmPassword !== formData.password && !test) {
    errorMessage.push(["كلمة المرور غير متطابقة", "Passwords do not match"]);
  }

  setErrorMessage(errorMessage);
}

export function handlePersonalInfo(formData, setErrorMessage) {
  let errorMessage = [];

  if (!formData.firstName) {
    errorMessage.push(["يرجى إدخال الاسم الاول", "Please enter a first name"]);
  }

  if (!formData.lastName) {
    errorMessage.push(["يرجى إدخال اسم العائلة", "Please enter a last name"]);
  }

  const username = formData.firstName + formData.lastName;
  const namePattern = /^[A-Za-z0-9\u0600-\u06FF]{4,29}$/;

  if (!namePattern.test(username)) {
    errorMessage.push([
      "يجب أن يكون الاسم بين 3 و 30 حرفًا ويتكون فقط من الحروف والأرقام",
      "Username must be between 3 and 30 characters long and can only contain letters and numbers.",
    ]);
  }

  const labels = ["age", "weight", "height", "skinColor", "shape", "health"];

  let testFound = 0;

  labels.map((label) => {
    let ageTest =
      label === "age" &&
      label !== "" &&
      (formData[label] < 18 || formData[label] > 100);
    let weightTest =
      label === "weight" &&
      label !== "" &&
      (formData[label] < 30 || formData[label] > 200);
    let heightTest =
      label === "height" &&
      label !== "" &&
      (formData[label] < 60 || formData[label] > 260);
    if (
      !formData[label] ||
      ageTest ||
      weightTest ||
      heightTest ||
      (!labels.slice(0, 2).includes(label) &&
        (!formData[label][1] || !formData[label][0]))
    ) {
      if (!testFound)
        errorMessage.push([
          "الرجاء ملء جميع الحقول",
          "Please fill all the required",
        ]);
      testFound = 1;
    }
  });

  setErrorMessage(errorMessage);
}

export function handleNationality(formData, setErrorMessage) {
  let errorMessage = [];

  const labels = ["nationality", "country", "city", "residence"];

  let testFound = 0;

  labels.map((label) => {
    if (!formData[label][1] || !formData[label][0]) {
      // console.log(label)
      if (!testFound)
        errorMessage.push([
          "الرجاء ملء جميع الحقول",
          "Please fill all the required",
        ]);
      testFound = 1;
    }
  });

  setErrorMessage(errorMessage);
}

export function handleReligion(formData, setErrorMessage) {
  let errorMessage = [];

  const labels = ["religion", "doctrine", "religiousCommitment", "smoking"];

  let testFound = 0;

  labels.map((label) => {
    if (!formData[label][1] || !formData[label][0]) {
      if (!testFound)
        errorMessage.push([
          "الرجاء ملء جميع الحقول",
          "Please fill all the required",
        ]);
      testFound = 1;
    }
  });

  setErrorMessage(errorMessage);
}

export function handleFamilyStatus(formData, setErrorMessage) {
  let errorMessage = [];

  const labels = ["familyStatus", "marriageType", "children"];

  let testFound = 0;

  labels.map((label) => {
    if (
      (label === "children" && formData.label) ||
      (label !== "children" && (!formData[label][1] || !formData[label][0]))
    ) {
      if (!testFound)
        errorMessage.push([
          "الرجاء ملء جميع الحقول",
          "Please fill all the required",
        ]);
      testFound = 1;
    }
  });

  setErrorMessage(errorMessage);
}

export function handleEducation(formData, setErrorMessage) {
  let errorMessage = [];

  const labels = ["educationLevel", "financialStatus"];

  let testFound = 0;

  labels.map((label) => {
    if (!formData[label][1] || !formData[label][0]) {
      if (!testFound)
        errorMessage.push([
          "الرجاء ملء جميع الحقول",
          "Please fill all the required",
        ]);
      testFound = 1;
    }
  });

  if (!formData.work) {
    errorMessage.push(["يرجى إدخال العمل", "Please enter work"]);
  }

  setErrorMessage(errorMessage);
}
