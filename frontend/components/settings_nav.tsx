import cn from "classnames";
import { useRouter } from "next/router";
import styles_box from "../styles/style_box.module.css";
import styles_s_l from "../styles/style_settings_nav.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const SettingsNav = ({ selected }: any) => {
  const sections = ["profile", "chat", "history", "statistics", "friends"];
  const router = useRouter();
  return (
    <div className={styles_box.profile_setting}>
      <div className={styles_s_l.profile_info}>
        <div className={styles_s_l.profile_image_wrap}>
          <Image
            src="https://cdn.intra.42.fr/users/yhadari.jpg"
            alt="avatar"
            width="100px"
            height="100px"
            className={styles_s_l.profile_image}
          ></Image>
        </div>
        <p className={styles_s_l.profile_info_login}>YHADARI</p>
        <p className={styles_s_l.profile_info_full_name}>{`HADARI YASSINE`}</p>
      </div>
      <div className={styles_s_l.setting_btns}>
        {sections.map((section, i) => {
          return (
            <div
              key={i}
              onClick={() => router.push(`/settings/${section}`)}
              className={cn(
                styles_s_l.setting_btn,
                selected === section && styles_s_l.current_btn
              )}
            >
              {section}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsNav;
