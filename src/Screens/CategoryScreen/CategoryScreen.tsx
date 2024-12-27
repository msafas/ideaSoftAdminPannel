import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import Header from '../../Components/Header/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../svg/svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper'; 
import { ToastType, useToast } from '../../Contexts/ToastProvider';

export default function CategoryScreen() {
    const theme = useTheme();
    const navigation = useNavigation() as any;
    const toast = useToast();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null); 

    const fetchCategories = async () => {
        setLoading(true);
        try {
            // son  eklenen kategorileri test edip görebilmeniz için param kullanarak ayın 26 sından sonraki kategorileri getiryorum
            const response = await axios.get('https://testcase.myideasoft.com/admin-api/categories?sort=id&startCreatedAt=2024-12-26', {
                headers: {
                    Authorization: `Bearer AX5FTZ7UBAABUDT6XYYPW7LX`,
                },
            });
            if (response.status === 200) {
                setData(response.data || []); 

            } else {
                toast.show(ToastType.Error, 'Kategoriler getirilirken bir hata oluştu');
            }
        } catch (error) {
            toast.show(ToastType.Error, 'Kategoriler getirilirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchCategories();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCategories();
        }
        , [])
        
    );


    const renderCategoryItem = ({ item }: { item: any }) => (
        <View style={styles.item}>
            <View style={styles.itemContent}>
                <View style={styles.textContent}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.slug}>Slug: {item.slug}</Text>
                    <Text style={styles.description}>{item.showcaseContent}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleEdit(item.id)}>
                        <Icon iconName={"edit"} size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
                        <Icon iconName={"delete"} size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const handleEdit = (id: number) => {
        navigation.navigate('CategoryEditScreen', { categoryId: id });
    };

    const handleDelete = async (id: number) => {


        try {
            const response = await axios.delete(`https://testcase.myideasoft.com/admin-api/categories/${id}`, {
                headers: {
                    Authorization: `Bearer AX5FTZ7UBAABUDT6XYYPW7LX`,
                },
            });
            if (response.status === 204) {
                toast.show(ToastType.Success, 'Kategori başarıyla silindi');
                fetchCategories();
            } else {
                toast.show(ToastType.Error, 'Kategori silinirken bir hata oluştu');
            }
        } catch (error) {
            toast.show(ToastType.Error, 'Kategori silinirken bir hata oluştu');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header />
            <FlatList
             refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={() => fetchCategories()}
                                    colors={[theme.colors.primary]}
                                />
                            }
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoryItem}
                contentContainerStyle={styles.flatListContent}
            />

            <FAB
                style={styles.fab}
                icon={() => <Icon iconName="plus" size={20} color="#fff" />}
                onPress={()=> {
                    navigation.navigate('CategoryAddedScreen'); 
                }}
                theme={{ colors: { accent: theme.colors.primary } }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    flatListContent: {
        padding: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContent: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    iconButton: {
        marginVertical: 5,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    slug: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ea', // FAB için istediğiniz renk
    },
});


