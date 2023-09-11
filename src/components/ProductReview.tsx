/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useGetCommentQuery,
  usePostCommentMutation,
} from '@/redux/features/products/productApi';
// import { useGetCommentQuery, usePostCommentMutation } from '@/redux/api/apiSlice';

const dummyComments = [
  'Bhalo na',
  'Ki shob ghori egula??',
  'Eta kono product holo ??',
  '200 taka dibo, hobe ??',
];

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const { data } = useGetCommentQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [postComment, { isError }] = usePostCommentMutation();
  console.log(isError);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);
    ('this comment is test');

    const options = {
      id: id,
      data: { comment: inputValue },
    };
    postComment(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form onSubmit={handleSubmit} className="flex gap-5 items-center">
        <Textarea
          value={inputValue}
          onChange={handleChange}
          className="min-h-[30px]"
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
