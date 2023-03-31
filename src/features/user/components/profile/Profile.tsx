import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserWithCompanyById } from "../../api";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const fetch = async () => {
      if (!userId) return;
      const fetchedUser = await getUserWithCompanyById(userId);
      setUser(fetchedUser);
    };
    fetch();
  }, [userId]);

  return (
    <div>
      <div className="bg-primary p-3"></div>
    </div>
  );
};

export default Profile;
