const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const BLOOD_GROUP_OPTIONS = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
];

const STUDENT_STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "GRADUATED", label: "Graduated" },
  { value: "DROPPED_OUT", label: "Dropped Out" },
  { value: "SUSPENDED", label: "Suspended" },
];

const SUBJECT_TYPE_OPTIONS = [
  {
    value: "THEORY",
    label: "Theory",
  },

  {
    value: "LAB",
    label: "Lab",
  },

  {
    value: "ELECTIVE",
    label: "Elective",
  },
];

const SEMESTER_OPTIONS = Array.from(
  { length: 8 },
  (_, index) => ({
    id: index + 1,
    name: `Semester ${index + 1}`,
  })
);


export { GENDER_OPTIONS, BLOOD_GROUP_OPTIONS, STUDENT_STATUS_OPTIONS, SUBJECT_TYPE_OPTIONS, SEMESTER_OPTIONS };
