export function handleGeneral(formData) {
  let errorMessage = [];

//   if (formData.password !=== "") {
//     let test = 0;

//     // Check if password is at least 8 characters long and contains both letters and digits
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     if (!passwordData.password || !passwordRegex.test(passwordData.password)) {
//       test = 1;
//       errorMessage.push([
//         "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على أرقام وأحرف",
//         "Password must be at least 8 characters long and contain both letters and digits",
//       ]);
//     }

//     // Check if confirmPassword matches password
//     if (passwordData.confirmPassword !=== passwordData.password && !test) {
//       errorMessage.push(["كلمة المرور غير متطابقة", "Passwords do not match"]);
//     }
//   }

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

  if (!formData.work) {
    errorMessage.push(["يرجى إدخال العمل", "Please enter work"]);
  }

  const labels = [
    "age",
    "weight",
    "height",
    "children",
    "skinColor",
    "shape",
    "health",
    "nationality",
    "country",
    "city",
    "residence",
    "religion",
    "doctrine",
    "religiousCommitment",
    "smoking",
    "familyStatus",
    "marriageType",
    "educationLevel",
    "financialStatus",
  ];

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
    let childrenTest =
      label === "children" &&
      label !== "" &&
      (formData[label] < 0 || formData[label] > 10);
    if (
      (!formData[label] && (label !== 'children')) || (ageTest || weightTest || heightTest || childrenTest) ||
      (!["age", "weight", "height", "children"].includes(label) &&
        (!formData[label][1] || !formData[label][0]))
    ) {
        // console.log(label)
      if (!testFound)
        errorMessage.push([
          "الرجاء ملء جميع الحقول",
          "Please fill all the required",
        ]);
      testFound = 1;
    }
  });

  return errorMessage;
}
