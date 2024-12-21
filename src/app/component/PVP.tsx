import styles from "../styles/PVP.module.css"
import Image from 'next/image';
import Props from "../../image/Props.png"
import Props2 from "../../image/Props2.png"
import VS_ICON from "../../image/VS.png"
import React from 'react';
import { FaCoffee } from 'react-icons/fa';
import { PlayerTeam } from "../home/model";
import { Button } from "@nextui-org/react";
import trophy from '../../image/trophy.png'

type Props = {
    teamOne?: PlayerTeam,
    teamTwo?: PlayerTeam,
    handleClickWin: Function,
    disabledButton?: boolean,
    isVisible?: boolean,
    isPlayedTwoRound?: boolean,
}


export default function PVP(props: Props) {
    // console.log(teamOne);

    return (

        <div className={styles.BG}>
            <div className={styles.Props1}>
                <Image src={Props} alt="props" />
            </div>
            <div className={styles.VS_Frame}>
                <div className={styles.Team_Frame}>
                    <div className={styles.Team1}>
                        <div style={{ fontSize: "14px", color: "#fff" }}>ทีม :</div>
                        <div style={{ fontSize: "18px", color: "#fff", fontWeight: "bold" }}>{props.teamOne?.firstPlayer} - {props.teamOne?.secondPlayer}</div>
                    </div>
                    <div style={{ padding: "0px 16px 0px 16px" }}>
                        <div className={styles.Win_Button} onClick={() => { props.handleClickWin(props.teamOne?.id, props.teamOne?.winCount) }}>
                            <Image src={trophy} alt='trophy' />
                            <p style={{ marginLeft: "8px", color: "#FAAD14", fontSize: "16px", fontWeight: 500}}>ชนะ ({props.teamOne?.winCount || 0}/2)</p>
                        </div>
                    </div>
                </div>

                <div style={{ width: "46px" }}> <Image src={VS_ICON} alt="VS_ICON" /> </div>

                <div className={styles.Team_Frame}>
                    <div className={styles.Team1}>
                        <div style={{ fontSize: "14px", color: "#fff" }}>ทีม :</div>
                        <div style={{ fontSize: "18px", color: "#fff", fontWeight: "bold" }}>{props.teamTwo?.firstPlayer} - {props.teamTwo?.secondPlayer}</div>
                    </div>
                    <div style={{ padding: "0px 16px 0px 16px" }}>
                        <div className={styles.Win_Button} onClick={() => { props.handleClickWin(props.teamOne?.id, props.teamOne?.winCount) }}>
                            <Image src={trophy} alt='trophy' />
                            <p style={{ marginLeft: "8px", color: "#FAAD14", fontSize: "16px", fontWeight: 500}}>ชนะ ({props.teamTwo?.winCount || 0}/2)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.Props2}>
                <Image src={Props2} alt="props2" />
            </div>
        </div>

    );
}

