import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserWithCompanyById } from "../../api";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!userId) return;
      const test = await getUserWithCompanyById(userId);
      console.log(test);
    };
    fetch();
  }, [userId]);

  return <div>Profile</div>;
};

export default Profile;
