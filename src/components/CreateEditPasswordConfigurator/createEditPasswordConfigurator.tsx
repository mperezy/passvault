import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  savePassword2Firebase,
  editPasswordFromFirebase,
  selectIsCreateMode,
  selectIsEditMode,
  selectPassword,
  selectPasswordDescriptionPicked,
} from 'reduxStore/slices/passwordSlice';
import {
  getSocialMediaListFromFirebase,
  selectSocialMediaList,
  selectSocialMediaPicked,
  setSocialMediaPicked,
} from 'reduxStore/slices/socialMediaSlice';

import { Picker, Text, TextInput, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { cardView, shadow } from 'screens/PasswordGenerator/styles';
import { createEditPassword } from './styles';
import { appColors, defaultEmptyPasswordDescription } from 'utils/constants';
import { socialMediaCollection } from 'services/firebase';
import { customAlertMessage } from 'utils/infoMessages';

export const CreateEditPasswordConfigurator = (props: { navigation: any }) => {
  const dispatch = useDispatch();
  const passwordDescriptionMaxLen = 60;
  const [description, setDescription] = useState('');
  const socialMediaPicked = useSelector(selectSocialMediaPicked);
  const passwordDescriptionPicked = useSelector(selectPasswordDescriptionPicked);
  const socialMediaList = useSelector(selectSocialMediaList);
  const isCreateMode = useSelector(selectIsCreateMode);
  const isEditMode = useSelector(selectIsEditMode);
  const password = useSelector(selectPassword);

  const { navigation } = props;
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

      socialMediaCollection.onSnapshot(() => {
        dispatch(getSocialMediaListFromFirebase());
      });
    }
  }, []);

  return (
    <View style={[cardView.container, shadow.container, createEditPassword.container]}>
      <View style={createEditPassword.userInputContainer}>
        <Text style={createEditPassword.textLabel}>Social media:</Text>
        <Picker
          // ref={pickerRef}
          style={createEditPassword.dropdown}
          selectedValue={socialMediaPicked}
          onValueChange={(itemValue, itemIndex) => {
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
          placeholder={'Type in here...'}
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
        onPress={() => {
          if (socialMediaPicked !== '') {
            const data = {
              password,
              description,
              socialMedia: socialMediaPicked,
            };
            if (isEditMode) {
              customAlertMessage(
                'Edit password warning !',
                "If you update this password, you won't be able to recover it.",
                () => {
                  dispatch(editPasswordFromFirebase(data));
                  navigation.navigate('PasswordList');
                }
              );
            } else {
              dispatch(savePassword2Firebase(data));
              navigation.navigate('PasswordList');
            }
          }
        }}
      >
        {createEditButtonLabel}
      </Entypo.Button>
    </View>
  );
};
