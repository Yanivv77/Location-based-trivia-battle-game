import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


function ProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
 

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
    

    return () => {
      dispatch(reset());
    };
  }, [user,  dispatch]);

//   if (isLoading) {
//     return <Spinner />;
//   }

  return (
    <>
      <div>Profile Screen</div>
    </>
  );
}

export default ProfileScreen;