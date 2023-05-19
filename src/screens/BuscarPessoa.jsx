import { useEffect, useState } from "react";
import { View } from "react-native";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FlatList } from "react-native-web";
import { Text, TextInput } from "react-native-paper";

export default function BuscarPessoas( ) {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState([]);

     async function BuscarPessoas() {
        const pessoasRef = collection(db, 'pessoas')
        const buscaPessoas = query(pessoasRef, where('NomePessoa', '==', busca))
        const resultadoSnapshot = await getDocs(buscaPessoas);

        const listaPessoas = resultadoSnapshot.docs.map(doc => doc.data())
        console.log(listaPessoas);
        setResultado(listaPessoas);
     }

    useEffect(
        () => {
             BuscarPessoas();
        }, [busca]
    )

    return (
        <View>
        <Text> Pessoas </Text>
        <TextInput
        label= "Faça sua busca"
        value={busca}
        onChangeText={setBusca}
         />

           <FlatList
                data={resultado}
                renderItem={({ item }) => <Text key={item.id}>{item.NomePessoa}</Text>}
            />

        </View>
    )

}  