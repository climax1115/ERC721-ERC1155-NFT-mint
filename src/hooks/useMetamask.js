import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { supportedNetworks } from '../config/constants/constants';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector'

export const MetaMaskContext = React.createContext({})

const injected = new InjectedConnector({ supportedNetworks: supportedNetworks })

export const MetaMaskProvider = ({ children }) => {

    const { activate, account, active, deactivate, chainId } = useWeb3React()

    const [isActive, setIsActive] = useState(false)
    const [shouldDisable, setShouldDisable] = useState(false) // Should disable connect button while connecting to MetaMask
    const [isLoading, setIsLoading] = useState(true)

    // Init Loading
    useEffect(() => {
        connect().then(val => {
            setIsLoading(false)
        })
    }, [])

    // Check when App is Connected or Disconnected to MetaMask
    const handleIsActive = useCallback(() => {
        console.log('App is connected with MetaMask ', active)
        setIsActive(active)
    }, [active])

    useEffect(() => {
        handleIsActive()
    }, [handleIsActive])

    // Connect to MetaMask wallet
    const connect = async () => {
        console.log('Connecting to MetaMask...')
        setShouldDisable(true)
        try {
            await activate(injected).then(() => {
                setShouldDisable(false)
            })
        } catch (error) {
            console.log('Error on connecting: ', error)
        }
    }

    // Disconnect from Metamask wallet
    const disconnect = async () => {
        console.log('Disconnecting wallet from App...')
        try {
            await deactivate()
        } catch (error) {
            console.log('Error on disconnnect: ', error)
        }
    }

    const values = useMemo(
        () => ({
            isActive,
            account,
            isLoading,
            connect,
            disconnect,
            shouldDisable,
            chainId
        }),
        [isActive, isLoading, shouldDisable, account, chainId]
    )

    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}

export default function useMetaMask() {
    const context = React.useContext(MetaMaskContext)

    if (context === undefined) {
        throw new Error('useMetaMask hook must be used with a MetaMaskProvider component')
    }

    return context
}