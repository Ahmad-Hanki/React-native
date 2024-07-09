import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchData();
  };

  return {
    data,
    refetch,
    loading,
  };
};

export default useAppwrite;
