export interface PlayerTeam {
    id?: string
    firstPlayer: string
    secondPlayer: string
    winCount?: number
    update_by: string
    courtId: number
}

export interface ListAllPlayer {
    teamOnePlay?: PlayerTeam
    teamTwoPlay?: PlayerTeam
    teamQueueList?: PlayerTeam[]
}

