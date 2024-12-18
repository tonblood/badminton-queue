import React, { useState } from "react";
import { types } from "util";
import { RiContactsBook3Line } from "react-icons/ri";

type Props = {

}


const text_input = () => {
  return (
    <div >
        <input 
            placeholder="Type something..."
            // startContent={<RiContactsBook3Line />}
            
                                            

        />
    </div>
    
  );
}

export default text_input
