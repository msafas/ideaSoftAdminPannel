import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView,  KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ToastType, useToast } from '../../Contexts/ToastProvider';
import Icon from '../../svg/svg';

export default function CategoryEditScreen() {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const categoryId = route.params?.categoryId; // Kategori ID'si
    const toast = useToast();
    const [data, setData] = useState(null); // Başlangıçta boş
    const [loading, setLoading] = useState(true); // Veri çekildiği sürece loading
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        // Kategori verilerini GET isteği ile çekiyoruz
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(
                    `https://testcase.myideasoft.com/admin-api/categories/${categoryId}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX', // Tokenınızı burada kullanın
                        },
                    }
                );
                if (response.status === 200) {
                    setData(response.data); // Veriyi state'e kaydediyoruz
                } else {
                    toast.show(ToastType.Error, 'Kategori verileri alınamadı');
                }
            } catch (error) {
                console.error('Veri alınırken hata:', error);
                toast.show(ToastType.Error, 'Kategori verileri alınırken bir hata oluştu');
            } finally {
                setLoading(false); // Yüklenme bitti
            }
        };

        fetchCategoryData(); // Fonksiyonu çağırıyoruz
    }, [categoryId]);

    const handleUpdateCategory = async () => {
        setIsUpdating(true);
        setLoading(true);
        try {
            const response = await axios.put(
                `https://testcase.myideasoft.com/admin-api/categories/${categoryId}`, 
                data,  // Form verileri
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                toast.show(ToastType.Success, 'Kategori başarıyla güncellendi!');
                navigation.goBack();
            } else {
                toast.show(ToastType.Error, 'Kategori güncellenirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Kategori güncellenirken hata:', error);
            toast.show(ToastType.Error, 'Kategori güncellenirken bir hata oluştu');
        } finally {
            setIsUpdating(false);
            setLoading(false);
        }
    };

    // if (loading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             {/* <ActivityIndicator size="large" color={theme.colors.primary} /> */}
    //             <Text>Loading...</Text>
    //         </View>
    //     );
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }} style={styles.headerContainer}>
                <Icon iconName={"back"} size={20} color={theme.colors.primary} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Kategori Düzenle</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.inputLabel}>Kategori Adı</Text>
                        <TextInput
                            style={styles.input}
                            value={data?.name}
                            onChangeText={(text) => setData({ ...data, name: text })}
                            placeholder="Kategori Adı"
                        />

                        <Text style={styles.inputLabel}>Slug</Text>
                        <TextInput
                            style={styles.input}
                            value={data?.slug}
                            onChangeText={(text) => setData({ ...data, slug: text })}
                            placeholder="Slug"
                        />

                        <Text style={styles.inputLabel}>Sıralama</Text>
                        <TextInput
                            style={styles.input}
                            value={String(data?.sortOrder)}
                            onChangeText={(text) => setData({ ...data, sortOrder: parseInt(text) })}
                            placeholder="Sıralama"
                            keyboardType="numeric"
                        />

                        <Text style={styles.inputLabel}>Durum (1: Aktif, 0: Pasif)</Text>
                        <TextInput
                            style={styles.input}
                            value={String(data?.status)}
                            onChangeText={(text) => setData({ ...data, status: parseInt(text) })}
                            placeholder="Durum (1: Aktif, 0: Pasif)"
                            keyboardType="numeric"
                        />

                        <Button
                            title={isUpdating ? 'Güncelleniyor...' : 'Kategori Güncelle'}
                            onPress={handleUpdateCategory}
                            disabled={isUpdating}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});
