import AsyncStorage from "@react-native-async-storage/async-storage";

const { sharedObject, setSharedObject } = useContext(AppContext);

export async function setAsyncItem(name="test",data={}){
    await AsyncStorage.setItem(name,data)
    setSharedObject({
        ...sharedObject,
        user:{data}
    })
}

export async function getAsyncItem(name){
    await AsyncStorage.getItem(name)
}