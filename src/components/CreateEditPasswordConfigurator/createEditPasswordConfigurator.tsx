import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  savePassword2Firebase,
  selectIsCreateMode,
  selectIsEditMode,
  selectPassword,
  selectPasswordDescriptionPicked,
  selectPasswordIdPicked,
  setPasswordIdPicked,
  setPasswordDescriptionPicked,
} from 'reduxStore/slices/passwordSlice';
import {
  selectSocialMediaList,
  selectSocialMediaPicked,
  setSocialMediaPicked,
} from 'reduxStore/slices/socialMediaSlice';

import { Picker, Text, TextInput, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { cardView, shadow } from 'screens/PasswordGenerator/styles';
import { appColors, defaultEmptyPasswordDescription } from 'utils/constants';
import { setModalMessage, setModalTitle, setModalVisible } from 'reduxStore/slices/uiElementsSlice';
import { createEditPassword } from './styles';

export const CreateEditPasswordConfigurator = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const passwordDescriptionMaxLen = 60;
  const [description, setDescription] = useState('');

  const socialMediaPicked = useSelector(selectSocialMediaPicked);
  const passwordDescriptionPicked = useSelector(selectPasswordDescriptionPicked);
  const socialMediaList = useSelector(selectSocialMediaList);
  const isCreateMode = useSelector(selectIsCreateMode);
  const isEditMode = useSelector(selectIsEditMode);
  const passwordIdPicked = useSelector(selectPasswordIdPicked);
  const password = useSelector(selectPassword);

  const createEditButtonLabel = isCreateMode ? 'Save' : 'Edit';

  useEffect(() => {
    if (isCreateMode || isEditMode) {
      if (isEditMode) {
        setDescription(
          passwordDescriptionPicked !== defaultEmptyPasswordDescription
            ? passwordDescriptionPicked
            : ''
        );
      }
    }
  }, []);

  const handleCreateEditButton = () => {
    if (socialMediaPicked !== '') {
      const data = {
        password,
        description,
        socialMedia: socialMediaPicked,
      };
      if (isEditMode) {
        dispatch(setPasswordDescriptionPicked({ passwordDescriptionPicked: description }));
        dispatch(setPasswordIdPicked({ passwordIdPicked }));
        dispatch(setModalTitle({ modalTitle: 'Edit password warning !' }));
        dispatch(
          setModalMessage({
            modalMessage: "If you update this password, you won't be able to recover it.",
          })
        );
        dispatch(setModalVisible({ modalVisible: true }));
      } else {
        dispatch(savePassword2Firebase(data));
        navigation.navigate('PasswordList');
      }
    }
  };

  return (
    <View style={[cardView.container, shadow.container, createEditPassword.container]}>
      <View style={createEditPassword.userInputContainer}>
        <Text style={createEditPassword.textLabel}>Social media:</Text>
        <Picker
          // ref={pickerRef}
          style={createEditPassword.dropdown}
          selectedValue={socialMediaPicked}
          onValueChange={(itemValue) => {
            dispatch(setSocialMediaPicked({ socialMediaPicked: itemValue }));
          }}
        >
          {socialMediaList.map((item: { id: string; name: string }) => {
            const label = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            return <Picker.Item key={item.id} label={label} value={item.name} />;
          })}
        </Picker>
      </View>

      <View style={createEditPassword.userInputContainer}>
        <Text style={createEditPassword.textLabel}>Description:</Text>
        <TextInput
          style={createEditPassword.textInput}
          placeholder='Type in here...'
          maxLength={passwordDescriptionMaxLen}
          value={description}
          onChangeText={(text: string) => setDescription(text)}
        />
        <Text style={createEditPassword.descriptionLengthIndicator}>
          {description.length}/{passwordDescriptionMaxLen}
        </Text>
      </View>

      <Entypo.Button
        style={createEditPassword.button}
        name={isCreateMode ? 'save' : 'edit'}
        size={24}
        color={appColors.textTint}
        backgroundColor={appColors.primary}
        onPress={handleCreateEditButton}
      >
        {createEditButtonLabel}
      </Entypo.Button>
    </View>
  );
};

interface Props {
  navigation: any;
}
