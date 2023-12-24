import { useXR } from '@react-three/xr'
export function Player() {
    /**
     * responsible for teleportation of player during xr sessions
     */
    
    const { player } = useXR()
        player.position.x = -2
        player.position.y = 0
        player.position.z = 4.5

    return null
}
