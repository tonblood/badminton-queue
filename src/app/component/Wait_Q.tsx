import styles from "../styles/Wait_Q.module.css";
import { PlayerTeam } from "../home/model";
import treeDot from "../../icon/3Dot.png";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FiEdit } from 'react-icons/fi';
import { FaSignOutAlt } from 'react-icons/fa';

const Wait_Q = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: any) => {
    console.log("Selected option:", option); // แสดงค่าที่เลือก
    setIsOpen(false); // ปิด Dropdown หลังจากเลือก
  };

  // ปิด Dropdown เมื่อคลิกลอยออกไปข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      //@ts-ignore
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    
    <div style={{}}>
      <div style={{ marginTop: "8px", display: "flex", marginBottom: "8px" }}>
        <p style={{ paddingLeft: "8px", flexGrow: 1 }}>ลำดับทีม</p>
        <p style={{ textAlign: "end", paddingRight: "8px" }}>จำนวน 2 คู่</p>
      </div>
      <div className={styles.WaitQ_BG}>
        <div className={styles.teamWait}>
          <div style={{ width: "16px", marginRight: "16px" }}>
            <p
              style={{
                justifySelf: "center",
                color: "#989898",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              3
            </p>
          </div>
          <div className={styles.teamName}>
            <div style={{ color: "#989898", fontSize: "12px" }}>ทีม:</div>
            <div
              style={{ color: "#333", fontSize: "16px", fontWeight: "bold" }}
            >
              Text - Text
            </div>
          </div>
          <div className={styles.mannage} onClick={toggleDropdown}>
            <Image src={treeDot} alt={"บังคับออก แก้ไขชื่อผู้เล่น"} />
          </div>
          {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul>
            <li
              onClick={() => handleOptionClick("Option 1")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              แก้ไขชื่อผู้เล่น
            </li>
            <li
              onClick={() => handleOptionClick("Option 2")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              // content={<FiEdit className='basis-2/8 ' fontSize={14} />}
              >
          
              ออกจากคิว
            </li>
          </ul>
        </div>
      )}
        </div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default Wait_Q;
