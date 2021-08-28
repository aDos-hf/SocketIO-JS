/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
  View,
  Text,
} from 'react-native';

import io from 'socket.io-client';
import uuid from 'react-native-uuid';

//CONSTANTS
const SOCKET_MESSAGE_TYPE = {
  CHAT_MESSAGE: 'chat message',
};

const LOCALHOST =
  Platform.OS === 'ios' ? 'http://127.0.0.1:3000' : 'http://10.0.2.2:3000';
const socket = io(LOCALHOST);

const App = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const updatedMessages = [...allMessages];
    const listener = msg => {
      console.warn('Message', msg);
      updatedMessages.push(msg);
      setAllMessages(updatedMessages);
      setCurrentMessage(currentMessage); // force rerender
    };
    socket.on(SOCKET_MESSAGE_TYPE.CHAT_MESSAGE, listener);
    return () => socket.off(SOCKET_MESSAGE_TYPE.CHAT_MESSAGE, listener);
  }, [SOCKET_MESSAGE_TYPE.CHAT_MESSAGE]);

  const submitCurrentMessage = () => {
    const payload = {
      uuid: uuid.v4(),
      message: currentMessage,
    };
    socket.emit(SOCKET_MESSAGE_TYPE.CHAT_MESSAGE, payload);
    setCurrentMessage('');
  };
  return (
    <SafeAreaView>
      <StatusBar />
      {allMessages?.map((msg, index) => {
        const {uuid, message} = msg;
        return (
          <View key={index}>
            <Text>{`${uuid}: ${message}`}</Text>
          </View>
        );
      })}
      <TextInput
        style={{height: 40, borderWidth: 2, top: 100}}
        onChangeText={setCurrentMessage}
        onSubmitEditing={submitCurrentMessage}
        value={currentMessage}
      />
    </SafeAreaView>
  );
};

export default App;
