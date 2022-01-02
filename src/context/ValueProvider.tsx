import {
  FC,
  createContext,
  ReactNode,
  useMemo,
  useState,
  useContext,
} from "react";

interface Props {
  children?: ReactNode;
}

const ValueContext = createContext({} as ReturnType<typeof usePassedDownValues>);

/** Below is for the Chrome React dev Tools extension
 * to display the name of the context instead
 * of "Context.provider"
 **/
ValueContext.displayName = "ValueContext";

/** Custom Hook for importing the 
 *  state in other areas of the app.
 **/
export const useValue = () => {
  const context = useContext(ValueContext);

  /** This check is optional if you are wrapping provider around a sub part
   *  of the component tree and not the entire app, to limit is availability
   *  to a certain section of the app.
   **/
  if (context === undefined) {
    throw new Error("useValue must be used within a ValueProvider");
  }
  return context;
};


const usePassedDownValues = () => {
  // In this case we want this value variable and it's setter function to be available globally.
  const [val, setVal] = useState<number>(0);

  //The state should be memoized to maintain the referential equality/ same location in memory. If not
  // every time this context is called a new location in memory will be created for the values.
  const valueObject = useMemo(() => {
    return { val, setVal };
  }, [val, setVal]);

  return valueObject
}

const ValueProvider: FC<Props> = ({ children }) => {
 
  // the value prop that is passed down are available to all of it's children.
  return (
    <ValueContext.Provider value={usePassedDownValues()}>
      {children}
    </ValueContext.Provider>
  );
};

export default ValueProvider;
