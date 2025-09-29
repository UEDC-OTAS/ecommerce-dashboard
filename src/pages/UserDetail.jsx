import { useEffect, useState } from "react";
import getUserDetail from "../api/userApi/getUserDetail";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdOutlinePhone,
  MdLocationOn,
  MdHome,
} from "react-icons/md";
import { Shield, ShieldOff, UserCheck, Calendar, UserX } from "lucide-react";
import Loading from "../components/utli/Loading";
import avatar from "../assets/Oval.png";

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetail = async () => {
    setLoading(true);
    try {
      const response = await getUserDetail(id);
      if (response.success) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (user) => {
    if (user.isBanned) {
      return (
        <span className="px-4 py-2 text-sm rounded-full bg-red-100 text-red-800">
          Banned
        </span>
      );
    }
    if (user.isVerified) {
      return (
        <span className="px-4 py-2 text-sm rounded-full bg-green-100 text-green-800">
          Verified
        </span>
      );
    }
    return (
      <span className="px-4 py-2 text-sm rounded-full bg-yellow-100 text-yellow-800">
        Unverified
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: "bg-purple-100 text-purple-800",
      user: "bg-blue-100 text-blue-800",
      staff: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-4 py-2 text-sm rounded-full ${
          roleColors[role] || "bg-gray-100 text-gray-800"
        }`}
      >
        {role?.charAt(0).toUpperCase() + role?.slice(1)}
      </span>
    );
  };

  if (loading || !userData) {
    return <Loading />;
  }

  const { user, userAddressInfo } = userData;

  return (
    <div className="h-[calc(100vh-50px)] overflow-y-auto px-5">
      <div>
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <div className="flex gap-2 items-center">
            <MdArrowBack size={24} onClick={() => navigate("/users")} />
            <h1 className="header">User Details</h1>
          </div>
          <div className="flex gap-2 items-center">
            {user.isBanned ? (
              <button
                className="flex items-center gap-2 mr-4 border border-green-500 px-4 py-3 rounded-3xl text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300 text-[16px]"
                onClick={() => {
                  // Handle unban user
                  console.log("Unban user:", user._id);
                }}
              >
                <Shield className="w-5 h-5" />
                Unban User
              </button>
            ) : (
              <button
                className="flex items-center gap-2 mr-4 border border-red-500 px-4 py-3 rounded-3xl text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 text-[16px]"
                onClick={() => {
                  // Handle ban user
                  console.log("Ban user:", user._id);
                }}
              >
                <ShieldOff className="w-5 h-5" />
                Ban User
              </button>
            )}
          </div>
        </div>

        <div>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-20">
              <div className="space-y-10 w-full">
                {/* User Information */}
                <div className="py-4 px-5 border rounded-lg">
                  <h1 className="font-semibold text-[24px] mb-10">
                    User Information
                  </h1>
                  <div className="flex items-center gap-10 lg:gap-20">
                    <div className="flex items-center gap-5">
                      <img src={avatar} alt="" className="w-20 h-20" />
                      <div className="">
                        <p className="font-bold text-[24px]">{user.userName}</p>
                        <span className="font-bold flex items-center gap-2">
                          <MdOutlinePhone /> {user.phoneNumber}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-[16px] mb-2">
                        User Status
                      </p>
                      <div>{getStatusBadge(user)}</div>
                    </div>

                    <div>
                      <p className="font-semibold text-[16px] mb-2">
                        User Role
                      </p>
                      <div>{getRoleBadge(user.role)}</div>
                    </div>
                  </div>

                  {/* Additional User Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
                    <div>
                      <label htmlFor="userId" className="label">
                        User ID
                      </label>
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        readOnly
                        value={user._id}
                        className="input-box"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastActive" className="label">
                        Last Active
                      </label>
                      <input
                        type="text"
                        id="lastActive"
                        name="lastActive"
                        readOnly
                        value={formatDate(user.lastActiveAt)}
                        className="input-box"
                      />
                    </div>

                    <div>
                      <label htmlFor="createdAt" className="label">
                        Member Since
                      </label>
                      <input
                        type="text"
                        id="createdAt"
                        name="createdAt"
                        readOnly
                        value={formatDate(user.createdAt)}
                        className="input-box"
                      />
                    </div>

                    <div>
                      <label htmlFor="updatedAt" className="label">
                        Last Updated
                      </label>
                      <input
                        type="text"
                        id="updatedAt"
                        name="updatedAt"
                        readOnly
                        value={formatDate(user.updatedAt)}
                        className="input-box"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="py-4 px-5 border rounded-lg">
                  <h1 className="font-semibold text-[24px] mb-10">
                    Saved Addresses
                  </h1>

                  {userAddressInfo && userAddressInfo.length > 0 ? (
                    <div className="space-y-6">
                      {userAddressInfo.map((address, index) => (
                        <div
                          key={address._id}
                          className="p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <MdLocationOn className="w-5 h-5 text-gray-700" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {address.note}
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="label">Address</label>
                              <input
                                type="text"
                                readOnly
                                value={address.address}
                                className="input-box"
                              />
                            </div>

                            <div>
                              <label className="label">City</label>
                              <input
                                type="text"
                                readOnly
                                value={address.city}
                                className="input-box"
                              />
                            </div>

                            <div>
                              <label className="label">Township</label>
                              <input
                                type="text"
                                readOnly
                                value={address.township}
                                className="input-box"
                              />
                            </div>

                            <div>
                              <label className="label">Address ID</label>
                              <input
                                type="text"
                                readOnly
                                value={address._id}
                                className="input-box"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <MdHome className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No saved addresses found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          {/* User Statistics */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-10">
            <div className="flex justify-between items-center mb-8 pb-4">
              <h2 className="header">User Statistics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <MdLocationOn className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Saved Addresses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userAddressInfo?.length || 0}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Days Since Joined</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.floor(
                    (new Date() - new Date(user.createdAt)) /
                      (1000 * 60 * 60 * 24)
                  )}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {user.isVerified ? (
                    <UserCheck className="w-8 h-8 text-green-600" />
                  ) : (
                    <UserX className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Verification Status
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {user.isVerified ? "Verified" : "Unverified"}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {user.isBanned ? (
                    <ShieldOff className="w-8 h-8 text-red-600" />
                  ) : (
                    <Shield className="w-8 h-8 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">Account Status</p>
                <p className="text-lg font-bold text-gray-900">
                  {user.isBanned ? "Banned" : "Active"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
