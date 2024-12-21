import styles from "../styles/Header.module.css"
import Header_Pic from "../../image/badminton-info.png"
import Image from "next/image";
import { PlayerTeam } from "../home/model";

// type Props = {
//     cID ?: PlayerTeam | number,
// }

export default function Header({ cID }: { cID: number }) {
    return (
        <div className={styles.Frame}>
            <div className={styles.Text_Frame}>
                <div className={styles.court}>
                    <p style={{ color: "#fff" }}> Court</p>
                    <p style={{ color: "#fff" }}>สนามที่</p>
                </div>
                <div style={{ color: "#fff", fontSize: "56px", fontWeight: "bold", paddingTop: "2px" }}>{cID}</div>
            </div>
            <div className={styles.Image_Frame}>
                <Image src={Header_Pic} style={{ width: "180px" }} alt={""} />
            </div>
        </div>
    );
}


