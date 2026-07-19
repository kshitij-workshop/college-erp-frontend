import ProfileField from "./ProfileField";
import ProfileHeader from "./ProfileHeader";
import ProfileSection from "./ProfileSection";

export default function FacultyProfile({ faculty }) {
  return (
    <div className="space-y-6">
      <ProfileHeader
        photoUrl={faculty.photoUrl}
        name={faculty.fullName}
        subtitle={faculty.designation
          .replaceAll("_", " ")
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())}
        description={faculty.departmentName}
        status={faculty.status}
      />

      <ProfileSection title="Personal Information">
        <ProfileField
          label="Full Name"
          value={faculty.fullName}
        />

        <ProfileField
          label="Email"
          value={faculty.email}
        />

        <ProfileField
          label="Phone"
          value={faculty.phone}
        />

        <ProfileField
          label="Gender"
          value={faculty.gender}
        />

        <ProfileField
          label="Date of Birth"
          value={faculty.dateOfBirth}
        />

        <ProfileField
          label="Blood Group"
          value={faculty.bloodGroup}
        />

        <ProfileField
          label="Address"
          value={faculty.address}
        />
      </ProfileSection>

      <ProfileSection title="Professional Information">
        <ProfileField
          label="Employee Code"
          value={faculty.employeeCode}
        />

        <ProfileField
          label="Designation"
          value={faculty.designation
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        />

        <ProfileField
          label="Qualification"
          value={faculty.qualification}
        />

        <ProfileField
          label="Specialization"
          value={faculty.specialization}
        />

        <ProfileField
          label="Experience"
          value={`${faculty.experienceYears} Years`}
        />

        <ProfileField
          label="Department"
          value={faculty.departmentName}
        />

        <ProfileField
          label="Joining Date"
          value={faculty.joiningDate}
        />

        <ProfileField
          label="Status"
          value={faculty.status}
        />
      </ProfileSection>
    </div>
  );
}