import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserWithCompanyById } from "../../api";
import { FaGraduationCap, FaBriefcase, FaShare } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";

const Profile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState<Profile | null>(null);
  useEffect(() => {
    const fetch = async () => {
      if (!userId) return;
      const fetchedUser = await getUserWithCompanyById(userId);
      setProfileData(fetchedUser);
    };
    fetch();
  }, [userId]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 rounded-xl bg-primary p-3">
        <div className="flex items-center gap-3">
          <img
            src={profileData?.user.photo as string}
            className="h-16 w-16 rounded-full"
          />
          <div className="flex flex-col gap-0.5 text-primary">
            <div className="text-2xl">{profileData?.user.username}</div>
            <div className="flex items-center gap-3">
              <FaBriefcase />
              {profileData?.user.title}
            </div>
            <div className="flex items-center gap-3">
              <FaGraduationCap />
              {profileData?.user.education}
            </div>
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-secondary py-2">
          <FaShare />
          Share profile
        </button>
      </div>
      <div className="flex flex-col gap-3 rounded-xl bg-white p-3">
        LIA Periods
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-secondary py-2 px-3">
            <BsCalendarDateFill />
            {profileData?.user.start_date?.toString()}
          </div>
          to
          <div className="flex items-center gap-3 rounded-xl bg-secondary py-2 px-3">
            <BsCalendarDateFill />
            {profileData?.user.end_date?.toString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
