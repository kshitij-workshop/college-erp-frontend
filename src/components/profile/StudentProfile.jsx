import ProfileField from "./ProfileField";
import ProfileHeader from "./ProfileHeader";
import ProfileSection from "./ProfileSection";

export default function StudentProfile({ student }) {
  return (
    <div className="space-y-6">
      <ProfileHeader
        photoUrl={student.photoUrl}
        name={student.fullName}
        subtitle={student.rollNumber}
        description={student.programName}
        status={student.status}
      />

      <ProfileSection title="Personal Information">
        <ProfileField
          label="Full Name"
          value={student.fullName}
        />

        <ProfileField
          label="Email"
          value={student.email}
        />

        <ProfileField
          label="Phone"
          value={student.phone}
        />

        <ProfileField
          label="Gender"
          value={student.gender}
        />

        <ProfileField
          label="Date of Birth"
          value={student.dateOfBirth}
        />

        <ProfileField
          label="Blood Group"
          value={student.bloodGroup}
        />

        <ProfileField
          label="Address"
          value={student.address}
        />
      </ProfileSection>

      <ProfileSection title="Academic Information">
        <ProfileField
          label="Registration Number"
          value={student.registrationNumber}
        />

        <ProfileField
          label="Roll Number"
          value={student.rollNumber}
        />

        <ProfileField
          label="Department"
          value={student.departmentName}
        />

        <ProfileField
          label="Department Code"
          value={student.departmentCode}
        />

        <ProfileField
          label="Program"
          value={student.programName}
        />

        <ProfileField
          label="Batch"
          value={student.batchName}
        />

        <ProfileField
          label="Semester"
          value={`Semester ${student.semesterNumber}`}
        />

        <ProfileField
          label="Section"
          value={student.sectionName}
        />

        <ProfileField
          label="Admission Date"
          value={student.admissionDate}
        />

        <ProfileField
          label="Status"
          value={student.status}
        />
      </ProfileSection>

      <ProfileSection title="Guardian Information">
        <ProfileField
          label="Guardian Name"
          value={student.guardianName}
        />

        <ProfileField
          label="Relation"
          value={student.guardianRelation}
        />

        <ProfileField
          label="Guardian Phone"
          value={student.guardianPhone}
        />
      </ProfileSection>
    </div>
  );
}