"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RichProfileTemplate from "@/components/templates/RichProfileTemplate";
import { UserProfile } from "@/utils/types"; // Adjust path as needed

const UserProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { username } = params;

  useEffect(() => {
    if (typeof window !== "undefined" && username) {
      const storedProfiles = localStorage.getItem("userProfiles");
      if (storedProfiles) {
        const profiles: UserProfile[] = JSON.parse(storedProfiles);
        const currentProfile = profiles.find((p) => p.username === username);
        if (currentProfile) {
          setProfile(currentProfile);
        } else {
          console.error(`Profile with username '${username}' not found.`);
        }
      }
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>Profile not found for @{username}.</div>;
  }

  return <RichProfileTemplate profile={profile} />;
};

export default UserProfilePage;
