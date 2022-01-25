import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  savePassword2Firebase,
  editPasswordFromFirebase,
  selectIsCreateMode,
  selectIsEditMode,
  selectPassword,
} from 'reduxStore/slices/passwordSlice';
import {
  getSocialMediaListFromFirebase,
  selectSocialMediaList,
  selectSocialMediaPicked,
  setSocialMediaPicked,
} from 'reduxStore/slices/socialMediaSlice';

import { Picker, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { cardView, shadow } from 'screens/PasswordGenerator/styles';
import { savePassword } from 'components/CreateEditPasswordConfigurator/styles';
import { appColors } from 'utils/constants';
import { socialMediaCollection } from 'services/firebase';

export const CreateEditPasswordConfigurator = (props: { navigation: any }) => {
  const dispatch = useDispatch();
  const socialMediaPicked = useSelector(selectSocialMediaPicked);
  const socialMediaList = useSelector(selectSocialMediaList);
  const isCreateMode = useSelector(selectIsCreateMode);
  const isEditMode = useSelector(selectIsEditMode);
  const password = useSelector(selectPassword);

  const { navigation } = props;
  const createEditButtonLabel = isCreateMode ? 'Save' : 'Edit';

  useEffect(() => {
    if (isCreateMode || isEditMode) {
      socialMediaCollection.onSnapshot(() => {
        dispatch(getSocialMediaListFromFirebase());
      });
    }
  }, []);

  return (
    <View style={[cardView.container, shadow.container, savePassword.container]}>
      <View style={savePassword.dropdown}>
        <Text style={savePassword.textLabel}>Social media:</Text>
        <Picker
          // ref={pickerRef}
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

      <Entypo.Button
        style={savePassword.button}
        name={isCreateMode ? 'save' : 'edit'}
        size={24}
        color={appColors.textTint}
        backgroundColor={appColors.primary}
        onPress={() => {
          if (socialMediaPicked !== '') {
            const data = {
              password,
              socialMedia: socialMediaPicked,
            };
            if (isEditMode) {
              dispatch(editPasswordFromFirebase(data));
            } else {
              dispatch(savePassword2Firebase(data));
            }
            navigation.navigate('PasswordList');
          }
        }}
      >
        {createEditButtonLabel}
      </Entypo.Button>
    </View>
  );
};
