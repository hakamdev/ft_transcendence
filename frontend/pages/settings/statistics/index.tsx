import cn from "classnames";
import styles from "../../../styles/statistics.module.css";
import styles_box from "../../../styles/style_box.module.css";
import styles_s_l from "../../../styles/style_settings_nav.module.css";
import SettingsNav from "../../../components/settings_nav";
import Image from "next/image";
const History = () => {
  return (
    <div className={styles_box.container}>
      <SettingsNav selected={"statistics"} />
      <div className={styles_box.profile_details}>
        <div className={styles.statistics_box}>
          <div className={styles.part_one}>
            <div className={styles.left}>
              <div className={styles.avatar}>
                <Image
                  src="https://cdn.intra.42.fr/users/yhadari.jpg"
                  alt="user_img"
                  width={"100px"}
                  height={"100px"}
                ></Image>
              </div>
              <div>
                <p className={styles.user_name}>YHADARI</p>
                <div className={styles.level_box}>
                  <div className={styles.level_line}></div>
                  <div className={styles.level_number_box}>
                    <p>LEVEL 2</p>
                    <p>LEVEL 3</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <p className={styles.title}>MATCH PLAYED</p>
              <p className={styles.match_number}>50</p>
              <div className={styles.def_vic_box}>
                <div className={styles.defeat_box}>
                  <p className={styles.defeat_text}>DEFEAT</p>
                  <p className={styles.defeat_number}>20</p>
                </div>
                <div className={styles.victory_box}>
                  <p className={styles.victory_text}>VICTORY</p>
                  <p className={styles.victory_number}>30</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.part_two}>
            <p className={styles.ach_text}>ACHIEVMENTS</p>
            <div className={styles.ach_medal}>
              <Image
                src="/medal.svg"
                alt="medal_img"
                width="240%"
                height="240%"
              ></Image>
              <Image
                src="/medal.svg"
                alt="medal_img"
                width="240%"
                height="240%"
              ></Image>
              <Image
                src="/medal.svg"
                alt="medal_img"
                width="240%"
                height="240%"
              ></Image>
              <Image
                src="/medal.svg"
                alt="medal_img"
                width="240%"
                height="240%"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
