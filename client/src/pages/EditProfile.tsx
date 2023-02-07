import { useMutation } from '@tanstack/react-query';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Avatar from '~/components/Common/Avatar';
import Heading from '~/components/Common/Heading';
import FormGroupEdit from '~/components/EditProfile/FormGroupEdit';
import FormGroupEditTextarea from '~/components/EditProfile/FormGroupEditTextarea';
import ButtonForm from '~/components/Form/ButtonForm';
import { AppContext } from '~/contexts/AppContext';
import MainLayout from '~/layouts/MainLayout';
import uploadApi from '~/services/upload';
import userApi from '~/services/user';
import { IUserEdit } from '~/types/user';

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const [userData, setUserData] = useState<IUserEdit>({
    avatar: '',
    fullname: '',
    username: '',
    website: '',
    story: '',
    mobile: '',
    address: '',
    gender: 'male',
  });

  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const previewAvatar = useMemo(
    () => (fileAvatar ? URL.createObjectURL(fileAvatar) : userData.avatar),
    [fileAvatar, userData.avatar],
  );

  const updateUserMutation = useMutation({
    mutationFn: (userData: IUserEdit) => userApi.updateUser(userData),
  });

  const uploadImageMutation = useMutation({
    mutationFn: (body: FormData) => uploadApi.uploadImage(body),
  });

  useEffect(() => {
    if (currentUser) {
      const { avatar, fullname, username, website, story, mobile, gender, address } = currentUser;
      setUserData({
        avatar,
        fullname,
        gender,
        mobile,
        story,
        username,
        website,
        address,
      });
    }
  }, [currentUser]);

  const handleEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newAvatar = userData.avatar;
    if (fileAvatar) {
      const formData = new FormData();
      formData.append('image', fileAvatar);
      const uploadData = await uploadImageMutation.mutateAsync(formData);
      newAvatar = uploadData.data.data.path;
    }

    const newUserData = {
      ...userData,
      avatar: newAvatar,
    };

    updateUserMutation.mutate(newUserData, {
      onSuccess(data) {
        setCurrentUser(data.data.data);
        toast.success(data.data.msg);
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileAvatar(file);
  };

  return (
    <MainLayout>
      <section>
        <Heading content='Edit profile'></Heading>
        <div className='px-5 mt-11 mb-14 md:mt-4 md:px-20 lg:max-w-[600px] mx-auto'>
          <form encType='multipart/form-data' onSubmit={handleEditProfile}>
            <div className='flex items-center gap-4 pt-5 mb-4'>
              <Avatar size='large' url={previewAvatar}></Avatar>
              <div>
                <h3 className='text-xl leading-6'>{userData.username}</h3>
                <div>
                  <label
                    htmlFor='avatar'
                    className='text-sm font-medium cursor-pointer text-bluePrimary'
                  >
                    Change profile photo
                  </label>
                  <input
                    type='file'
                    accept='.jpg,.jpeg,.png,'
                    id='avatar'
                    name='avatar'
                    className='hidden'
                    onChange={handleChangeAvatar}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <FormGroupEdit
                handleChange={handleChange}
                label='Name'
                id='fullname'
                name='fullname'
                value={userData.fullname}
              ></FormGroupEdit>
              <FormGroupEdit
                handleChange={handleChange}
                label='Username'
                id='username'
                name='username'
                value={userData.username}
              ></FormGroupEdit>
              <FormGroupEdit
                handleChange={handleChange}
                label='Website'
                id='website'
                name='website'
                value={userData.website}
              ></FormGroupEdit>
              <FormGroupEditTextarea
                handleChange={handleChange}
                label='Story'
                id='story'
                name='story'
                value={userData.story}
              ></FormGroupEditTextarea>
              <FormGroupEdit
                handleChange={handleChange}
                label='Mobile'
                id='mobile'
                name='mobile'
                value={userData.mobile}
              ></FormGroupEdit>
              <ButtonForm
                type='submit'
                disabled={updateUserMutation.isLoading || uploadImageMutation.isLoading}
                isLoading={updateUserMutation.isLoading || uploadImageMutation.isLoading}
              >
                Update profile
              </ButtonForm>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default EditProfile;
