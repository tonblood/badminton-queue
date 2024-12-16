import React from 'react'
import styles from "../styles/Wait_Q.module.css"
import { PlayerTeam } from "../home/model";
const Wait_Q = () => {
    
  return (
    <div style={{marginTop:"8px"}}>
        <p style={{paddingLeft:"8px"}}>ลำดับทีม</p>
        <p style={{ textAlign: 'end',paddingRight:"8px" }}>จำนวน {awaitingTeamList.length+2} คู่</p>
    </div>
  )
}

export default Wait_Q
