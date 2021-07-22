import React, { useEffect, useRef } from 'react'
import firebase from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function ChatRoom({ subject }) {
    // const dummy = useRef()

    const messagesRef = firebase.db.collection(`${subject}-messages`)
    const query = messagesRef.orderBy('createdAt')

    const [messages] = useCollectionData(query, { idField: 'id' })
    // useEffect(() => {
    //     firebase.sendMessage('Hello!', subject)
    // }, [])
    return (
        <div className="chat-room">
            {/* {messages ? messages.map((msg) => msg.text) : null} */}
        </div>
    )
}

export default ChatRoom
