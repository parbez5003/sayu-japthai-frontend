import React, { useState } from "react";
import { CiCamera, CiEdit } from "react-icons/ci";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import useSingleImageURL from "../../../ImageURL/useSingleImageURL";



const Profile = () => {

    const { currentUser, refetch } = useCurrentUser();



    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit } = useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProfession, setSelectedProfession] = useState("");
    const [customProfession, setCustomProfession] = useState("");

    const [selectedCoverFile, setSelectedCoverFile] = useState();
    const { imageUrl: coverImageUrl, uploadImage: uploadCoverImage } =
        useSingleImageURL(selectedCoverFile);
    const [coverPreview, setCoverPreview] = useState();

    const [selectedProfileFile, setSelectedProfileFile] = useState();

    const { imageUrl: profileImageUrl, uploadImage: uploadProfileImage } =
        useSingleImageURL(selectedProfileFile);

    const [profilePreview, setProfilePreview] = useState();

    const {
        _id,
        name,
        email,
        state,
        date_of_birth,
        phone_number,
        coverPhoto,
        profilePhoto,
        country,
        postCode,
        district,
        gender,
        bio,
        profession,
    } = currentUser || {};

    // console.log(name);

    // Toggle editing mode
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    // Handle profession change
    const handleProfessionChange = (value) => {
        setSelectedProfession(value);
    };

    // Handle form submission
    const onSubmit = async (data) => {
        const uploadedCoverImageUrl = await uploadCoverImage();
        const uploadedProfileImageUrl = await uploadProfileImage();

        data.profession =
            selectedProfession === "others" ? customProfession : selectedProfession;

        const {
            name,
            birthday,
            phoneNumber,
            country,
            state,
            postCode,
            district,
            gender,
            bio,
            profession,
        } = data || {};

        // console.log(data);

        const updateUser = {
            date_of_birth: birthday,
            bio,
            phone_number: phoneNumber,
            profession,
            country,
            state,
            postCode,
            name,
            district,
            gender,
            coverPhoto: uploadedCoverImageUrl,
            profilePhoto: uploadedProfileImageUrl,
        };
        // Your form submission logic here
        console.log(updateUser);

        await axiosPublic
            .patch(`/users/${currentUser._id}`, updateUser)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(" Profile Update successfully");
                    setIsEditing(false);
                    refetch();
                } else {
                    console.error("Update failed: User not found or update unsuccessful");
                    toast.error("Update failed. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error occurred during update:", error);
            });
    };

    // Functions to handle file selection and preview for cover photo
    const onSelectCoverFile = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setSelectedCoverFile(undefined);
            setCoverPreview(undefined);
            return;
        }

        const selectedImage = files[0];
        setSelectedCoverFile(selectedImage);

        const objectUrl = URL.createObjectURL(selectedImage);
        setCoverPreview(objectUrl);
    };

    // Functions to handle file selection and preview for profile photo
    const onSelectProfileFile = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setSelectedProfileFile(undefined);
            setProfilePreview(undefined);
            return;
        }

        const selectedImage = files[0];
        setSelectedProfileFile(selectedImage);

        const objectUrl = URL.createObjectURL(selectedImage);
        setProfilePreview(objectUrl);
    };

    return (
        <>
            <div className="text-right px-4 ">
                <button onClick={toggleEditing}>
                    <CiEdit className="lg:text-3xl text-gray-900 md:text-2xl text-2xl  cursor-pointer  block  " />
                </button>
            </div>
            {/* Profile */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="lg:flex lg:gap-4 container mx-auto px-1 text-gray-600 ">
                    {/* Left side */}
                    <div className="lg:w-4/12 w-full ">
                        <div className="mt-1 lg:mt-3 lg:min-h-screen bg-gray-100 shadow-xl rounded-lg text-gray-800 ">
                            {/* Cover photo */}
                            <div className="relative rounded-t-lg lg:h-48 md:h-40 h-32 overflow-hidden">
                                {isEditing ? (
                                    <>
                                        {coverPreview ? (
                                            <img
                                                className="object-cover object-top w-full"
                                                src={coverPreview}
                                                alt=""
                                            />
                                        ) : (
                                            <div className="">
                                                <img
                                                    className="object-cover object-top w-full"
                                                    src={
                                                        coverPhoto
                                                            ? coverPhoto
                                                            : "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <img
                                        className="object-cover object-top w-full"
                                        src={
                                            coverPhoto
                                                ? coverPhoto
                                                : "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                                        }
                                        alt=""
                                    />
                                )}

                                <input
                                    type="file"
                                    id="coverFileInput"
                                    {...register("image")}
                                    hidden
                                    onChange={onSelectCoverFile}
                                />
                                {isEditing && (
                                    <CiCamera
                                        onClick={() => {
                                            document.getElementById("coverFileInput").click();
                                        }}
                                        className="absolute bottom-1 right-2 w-8 h-8 text-gray-800 fill-current bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200"
                                    />
                                )}
                            </div>

                            {/* profile Photo */}

                            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-blue-600 rounded-full overflow-hidden">
                                {isEditing ? (
                                    <>
                                        {profilePreview ? (
                                            <img
                                                className="object-cover object-top w-full"
                                                src={profilePreview}
                                                alt=""
                                            />
                                        ) : (
                                            <div className="">
                                                <img
                                                    className="object-cover object-top w-full"
                                                    src={
                                                        profilePhoto
                                                            ? profilePhoto
                                                            : "https://i.ibb.co/9HmwSVd/avatar4.jpg"
                                                    }
                                                    alt="Profile"
                                                />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <img
                                        className="object-cover object-center h-32"
                                        src={
                                            profilePhoto
                                                ? profilePhoto
                                                : "https://i.ibb.co/9HmwSVd/avatar4.jpg"
                                        }
                                        alt="Woman looking front"
                                    />
                                )}
                                <input
                                    type="file"
                                    id="profileFileInput"
                                    {...register("profilePhoto")}
                                    hidden
                                    onChange={onSelectProfileFile}
                                />
                                {isEditing && (
                                    <CiCamera
                                        onClick={() => {
                                            document.getElementById("profileFileInput").click();
                                        }}
                                        className="absolute bottom-6 -right-1.5 w-7 h-10  text-gray-800 fill-current rounded-full p-1 cursor-pointer hover:bg-gray-200"
                                    />
                                )}
                            </div>

                            <div className="text-center mt-2 text-gray-800 ">
                                <h2 className="font-semibold text-xl "> {name} </h2>

                                {isEditing ? (
                                    ""
                                ) : (
                                    <p className="mt-2">{email ? email : "user@gmail.com"}</p>
                                )}

                                {/* professioon */}
                                {isEditing ? (
                                    <div className="mb-2 mt-8 px-4 ">
                                        <label
                                            className="block md:text-xl text-left text-gray-800  text-sm font-bold mb-2"
                                            htmlFor="title"
                                        >
                                            Profession
                                        </label>
                                        <select
                                            className="w-full px-4 py-3 border-gray-600 text-gray-800 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
                                            onChange={(e) => handleProfessionChange(e.target.value)}
                                            defaultValue={profession}
                                        >
                                            <option value="">Select profession</option>
                                            <option value="Student">Student</option>
                                            <option value="Business">Business</option>
                                            <option value="Electrician">Electrician</option>
                                            <option value="Doctor">Doctor</option>
                                            <option value="Teacher">Teacher</option>
                                            <option value="Social Worker">Social Worker</option>
                                            <option
                                                value="Mechanical
                                                Engineer"
                                            >
                                                Mechanical Engineer
                                            </option>
                                            <option value="IT Technician">IT Technician</option>
                                            <option value="others">Others</option>
                                        </select>
                                        {selectedProfession === "others" && (
                                            <input
                                                type="text"
                                                placeholder="Enter your profession"
                                                className="w-full px-4 py-3 mt-2 border-gray-600 text-gray-800 border rounded-md bg-gray-100  focus:outline-none  focus:border-blue-500"
                                                value={customProfession}
                                                onChange={(e) => setCustomProfession(e.target.value)}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-800 mt-2 ">
                                        {profession ? profession : " "}
                                    </p>
                                )}
                            </div>
                            {/* bio */}
                            <div className="px-4 py-2">
                                <h1 className="border-b pb-1 border-gray-700 lg:mt-4"> Bio </h1>
                                {isEditing ? (
                                    <textarea
                                        className="w-full lg:mt-3 mt-2 h-auto md:min-h-60 min-h-32 border-gray-600 px-4 py-2 text-gray-800 border rounded-lg bg-gray-100  focus:outline-none focus:border-blue-500 "
                                        id="bio"
                                        placeholder="Bio"
                                        {...register("bio")}
                                        defaultValue={bio}
                                    />
                                ) : (
                                    <p className="text-sm md:text-lg lg:text-lg text-gray-800 lg:mt-3 pb-10 mt-1">
                                        {bio ? bio : "Introduce Your Self "}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="lg:w-8/12 w-full mx-auto mt-3 lg:mt-3 bg-gray-100 lg:p-6 md:p-4 p-2 rounded-md ">
                        <div>
                            <div className="flex items-center justify-between text-gray-800">
                                <h1>Personal Information</h1>
                                {/* <button onClick={toggleEditing}><CiEdit className='text-3xl cursor-pointer hidden lg:block  ' /></button> */}
                            </div>
                            <div className="border-b border-gray-700 pt-2"></div>
                            <div className="my-2">
                                {/* name */}
                                <div>
                                    {isEditing ? (
                                        <div className="mb-4 pt-2 ">
                                            <label
                                                className="block md:text-xl  text-gray-800  text-sm font-bold mb-2"
                                                htmlFor="title"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                className="w-full px-4 py-3 border-gray-600 text-gray-800 border rounded-md bg-gray-100  focus:outline-none focus:border-blue-500"
                                                id="fullName"
                                                type="text"
                                                placeholder="Full Name"
                                                {...register("name")}
                                                defaultValue={name}
                                                required
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                {/* phone number */}
                                <div className="my-2">
                                    {isEditing ? (
                                        <div className="mb-4 pt-2 ">
                                            <label
                                                className="block md:text-xl  text-gray-800  text-sm font-bold mb-2"
                                                htmlFor="title"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                className="w-full px-4 py-3 text-gray-800 border border-gray-600 rounded-md bg-gray-100   focus:outline-none focus:border-blue-500"
                                                id="phoneNumber"
                                                type="number"
                                                placeholder="Phone Number"
                                                {...register("phoneNumber")}
                                                defaultValue={phone_number}
                                                required
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className="py-2">Phone Number </h1>
                                            <h3 className="border border-gray-400 rounded-md w-full py-3 px-2">
                                                {phone_number ? phone_number : "01xxxxxxxxx"}{" "}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                                {/* genter */}
                                {isEditing ? (
                                    <div className="my-2">
                                        <label
                                            className="block md:text-xl text-gray-800 text-sm font-bold mb-2"
                                            htmlFor="title"
                                        >
                                            Gender
                                        </label>

                                        <div className="flex items-center mb-4">
                                            <input
                                                type="radio"
                                                id="male"
                                                value="male"
                                                {...register("gender")}
                                                defaultChecked={gender === "male"}
                                                name="gender"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="male"
                                                className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-800"
                                            >
                                                Male
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="female"
                                                value="female"
                                                {...register("gender")}
                                                defaultChecked={gender === "female"}
                                                name="gender"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="female"
                                                className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-800"
                                            >
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className="py-2">Gender</h1>
                                        <h3 className="border border-gray-400 rounded-md w-full py-3 px-2 uppercase">
                                            {gender ? gender : "N / A"}
                                        </h3>
                                    </div>
                                )}
                                {/* date of birth */}
                                <div className="my-2 ">
                                    {isEditing ? (
                                        <div>
                                            <label
                                                className="block md:text-xl  text-gray-800  text-sm font-bold mb-2"
                                                htmlFor="title"
                                            >
                                                Date Of Birth
                                            </label>

                                            <div className="relative ">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-800 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    defaultValue={date_of_birth}
                                                    type="date"
                                                    {...register("birthday")}
                                                    required
                                                    name="birthday"
                                                    className="border-gray-600 text-gray-800 border rounded-md bg-gray-100   focus:outline-none focus:border-blue-500 text-sm  block w-full ps-10 py-3 dark:focus:border-blue-500"
                                                    placeholder="Select your birthday date"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className="py-2">Date Of Birth</h1>
                                            <h3 className="border border-gray-400 rounded-md w-full py-3 px-2">
                                                {date_of_birth ? date_of_birth : " N / A "}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                                {/* post code  */} {/* state */}
                                <div className="lg:flex items-center justify-between gap-3">
                                    {/* post code  */}
                                    <div className="my-2 w-full ">
                                        {isEditing ? (
                                            <div className="mb-4 pt-2 ">
                                                <label
                                                    className="block md:text-xl  text-gray-800  text-sm font-bold mb-2"
                                                    htmlFor="title"
                                                >
                                                    Post Code
                                                </label>
                                                <input
                                                    className="w-full px-4 py-3 border-gray-600 text-gray-800 border rounded-md bg-gray-100   focus:outline-none focus:border-blue-500"
                                                    id="postCode"
                                                    type="text"
                                                    placeholder="Post Code"
                                                    {...register("postCode")}
                                                    defaultValue={postCode}
                                                    required
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <h1 className="py-2">Post Code </h1>
                                                <h3 className="border border-gray-400 rounded-md w-full py-3 px-2">
                                                    {postCode ? postCode : "N / A"}
                                                </h3>
                                            </div>
                                        )}
                                    </div>

                                    {/* state */}
                                    <div className="my-2 w-full ">
                                        {isEditing ? (
                                            <div className="mb-4 pt-2 ">
                                                <label
                                                    className="block md:text-xl  text-gray-800  text-sm font-bold mb-2"
                                                    htmlFor="title"
                                                >
                                                    State
                                                </label>
                                                <input
                                                    className="w-full px-4 py-3 border-gray-600 text-gray-800 border rounded-md bg-gray-100   focus:outline-none focus:border-blue-500"
                                                    id="state"
                                                    type="text"
                                                    placeholder="State"
                                                    {...register("state")}
                                                    defaultValue={state}
                                                    required
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <h1 className="py-2">State </h1>
                                                <h3 className="border border-gray-400 rounded-md w-full py-3 px-2">
                                                    {" "}
                                                    {state ? state : "state"}{" "}
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* district */} {/* country */}
                                <div className="lg:flex items-center justify-between gap-3">
                                    {/* district */}
                                    <div className="my-2 w-full ">
                                        {isEditing ? (
                                            <div className="mb-4 pt-2 ">
                                                <label
                                                    className="block md:text-xl  text-gray-800  text-sm font-bold mb-2"
                                                    htmlFor="title"
                                                >
                                                    District
                                                </label>
                                                <input
                                                    className="w-full px-4 py-3 border-gray-600 text-gray-800 border rounded-md bg-gray-100   focus:outline-none focus:border-blue-500"
                                                    id="district"
                                                    type="text"
                                                    placeholder="District"
                                                    {...register("district")}
                                                    defaultValue={district}
                                                    required
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <h1 className="py-2">District </h1>
                                                <h3 className="border border-gray-400 rounded-md w-full py-3 px-2">
                                                    {district ? district : "N / A"}
                                                </h3>
                                            </div>
                                        )}
                                    </div>

                                    {/* country */}
                                    <div className="my-2 w-full ">
                                        {isEditing ? (
                                            <div className="mb-4 pt-2 ">
                                                <label
                                                    className="block md:text-xl  text-gray-800  text-sm font-bold mb-2"
                                                    htmlFor="title"
                                                >
                                                    Country
                                                </label>
                                                <input
                                                    className="w-full px-4 py-3  border-gray-600 text-gray-800 border rounded-md bg-gray-100   focus:outline-none focus:border-blue-500"
                                                    id="country"
                                                    type="text"
                                                    placeholder="Country"
                                                    {...register("country")}
                                                    defaultValue={country}
                                                    required
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <h1 className="py-2">Country </h1>
                                                <h3 className="border border-gray-400 rounded-md w-full py-3 px-2">
                                                    {country ? country : "N / A"}
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* bnutton */}
                                <div className="p-4  mx-8 mt-2">
                                    {isEditing ? (
                                        <button
                                            type="submit"
                                            className="px-6 py-3 w-full bg-gray-900 rounded-lg font-bold text-gray-200  focus:outline-none "
                                        >
                                            Save Changes
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        </>
    );
};

export default Profile;