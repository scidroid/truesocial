import { Deso } from "deso.js";
import Router from "next/router";

const deso = new Deso({});

const getProfileByPKey = async (pkey) => {
  if (!pkey) return null;

  let profile;

  try {
    profile = await deso.getSingleProfile({
      publicKey: pkey,
    });
  } catch (e) {
    return null;
  }

  return profile;
};

const setProfile = (data) => {
  localStorage.setItem("profile", JSON.stringify(data));
  Router.reload(window.location.pathname);
};

const getProfile = () => {
  const profile = localStorage.getItem("profile");
  if (!profile) return null;
};

const deleteProfile = async () => {
  localStorage.removeItem("profile");
  Router.reload(window.location.pathname);
};

export { getProfileByPKey, setProfile, getProfile, deleteProfile };
