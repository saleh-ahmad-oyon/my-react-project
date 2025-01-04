import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

export const useSearchParams = () => {
 const [{ categoryId, title }, setParams] = useQueryStates(
   {
     categoryId: parseAsInteger
       .withDefault(0),
     title: parseAsString
       .withDefault('')
   },
   {
     history: "push",
     shallow: false,
   }
 );

 const setCategoryId = (newCategory: number) => {
   setParams({ categoryId: newCategory });
 };

 const setTitle = (newTitle: string) => {
   setParams({ title: newTitle });
 };

 return {
   categoryId,
   title,
   setCategoryId,
   setTitle
 };
};