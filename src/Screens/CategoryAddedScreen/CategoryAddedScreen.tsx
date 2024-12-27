import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ToastType, useToast } from '../../Contexts/ToastProvider';
import Icon from '../../svg/svg';

export default function CategoryAddedScreen() {
    const theme = useTheme();
    const navigation = useNavigation();
    const toast = useToast();

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [canonicalUrl, setCanonicalUrl] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [status, setStatus] = useState('');
    const [displayShowcaseContent, setDisplayShowcaseContent] = useState('');
    const [showcaseContentDisplayType, setShowcaseContentDisplayType] = useState('');
    const [displayShowcaseFooterContent, setDisplayShowcaseFooterContent] = useState('');
    const [showcaseFooterContentDisplayType, setShowcaseFooterContentDisplayType] = useState('');
    const [hasChildren, setHasChildren] = useState('');
    const [isCombine, setIsCombine] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddCategory = async () => {
        if (
            !name ||
            !sortOrder ||
            !status ||
            !displayShowcaseContent ||
            !showcaseContentDisplayType ||
            !displayShowcaseFooterContent ||
            !showcaseFooterContentDisplayType ||
            !hasChildren ||
            !isCombine
        ) {
            Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun!');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'https://testcase.myideasoft.com/admin-api/categories',
                {
                    name,
                    slug,
                    sortOrder: parseInt(sortOrder),
                    status: parseInt(status),
                    displayShowcaseContent: parseInt(displayShowcaseContent),
                    showcaseContentDisplayType: parseInt(showcaseContentDisplayType),
                    displayShowcaseFooterContent: parseInt(displayShowcaseFooterContent),
                    showcaseFooterContentDisplayType: parseInt(showcaseFooterContentDisplayType),
                    hasChildren: parseInt(hasChildren),
                    isCombine: parseInt(isCombine),
                    metaDescription,
                    metaKeywords,
                    pageTitle,
                    canonicalUrl,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 201) {
                toast.show(ToastType.Success, 'Kategori başarıyla eklendi');
                navigation.goBack();
            } else {
                toast.show(ToastType.Error, 'Kategori eklenirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Kategori eklerken hata:', error.response ? error.response.data : error.message);
            toast.show(ToastType.Error, `Kategori eklenirken bir hata oluştu: ${error.response ? error.response.data.message : error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text>Yükleniyor...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContainer}>
                <Icon iconName={"back"} size={20} color={theme.colors.primary} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Kategori Ekle</Text>
            </TouchableOpacity>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.formContainer}>

                    <TextInput style={styles.input} placeholder="Kategori Adı" value={name} onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Kategori Kısaltması" value={slug} onChangeText={setSlug} />
                    <TextInput style={styles.input} placeholder="Sıralama (Sayı)" value={sortOrder} onChangeText={setSortOrder} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Durum (0 veya 1)" value={status} onChangeText={setStatus} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Üst İçerik Görünsün mü? (0 veya 1)" value={displayShowcaseContent} onChangeText={setDisplayShowcaseContent} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="İçerik Gösterim Türü (Sayı)" value={showcaseContentDisplayType} onChangeText={setShowcaseContentDisplayType} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Alt İçerik Görünsün mü? (0 veya 1)" value={displayShowcaseFooterContent} onChangeText={setDisplayShowcaseFooterContent} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Alt İçerik Gösterim Türü (Sayı)" value={showcaseFooterContentDisplayType} onChangeText={setShowcaseFooterContentDisplayType} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Alt Kategori Var mı? (0 veya 1)" value={hasChildren} onChangeText={setHasChildren} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Birleştirilebilir mi? (0 veya 1)" value={isCombine} onChangeText={setIsCombine} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Meta Açıklaması" value={metaDescription} onChangeText={setMetaDescription} />
                    <TextInput style={styles.input} placeholder="Meta Anahtar Kelimeler" value={metaKeywords} onChangeText={setMetaKeywords} />
                    <TextInput style={styles.input} placeholder="Sayfa Başlığı" value={pageTitle} onChangeText={setPageTitle} />
                    <TextInput style={styles.input} placeholder="Canonical URL" value={canonicalUrl} onChangeText={setCanonicalUrl} />
                    <Button title="Kategori Ekle" onPress={handleAddCategory} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
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
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
});
