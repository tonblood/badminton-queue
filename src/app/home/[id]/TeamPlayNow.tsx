import { Button } from '@nextui-org/react'
import React from 'react'
import trophy from '../../../image/trophy.png'
import Image from 'next/image'
import { PlayerTeam } from './model'

type Props = {
    teamInfo?: PlayerTeam
    handleClickWin: Function
    disabledButton?: boolean
    isVisible: boolean
}

const TeamPlayNow = (props: Props) => {
    return (<>
        {props.teamInfo ? <>
            <div className='flex flex-row mx-3'>
                <div className="basis-4/5 grid grid-rows-2">
                    <p>ทีมของ</p>
                    <h4>{props.teamInfo.firstPlayer} - {props.teamInfo.secondPlayer}</h4>
                </div>
                <div className="basis-1/5" style={{ textAlign: 'end' }}>
                    {props.isVisible ? <Button variant='bordered'
                        size='sm'
                        startContent={<Image src={trophy} alt='trophy' />}
                        onClick={() => props.handleClickWin(props.teamInfo?.id, props.teamInfo?.winCount)}
                        style={{ color: '#FAAD14'}}
                        radius='full'
                        isDisabled={props.disabledButton}
                    >
                        ({props.teamInfo.winCount || 0}/2)
                    </Button> : null}
                </div>
            </div>
        </> : <div className='m-3'><p style={{ textAlign: 'center' }}>รอทีมลงแข่ง...</p></div>}
    </>

    )
}

export default TeamPlayNow