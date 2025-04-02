import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, ChevronUp, Edit, Save } from "lucide-react";
import { configurationEndPoints } from "../../endPoints/ConfigurationsEndPoint";
import {
  setProcessToggle,
  setScrappedData,
  setTabAccess,
  toggleLanguage,
} from "../../redux/historySlice/historySlice";

const TransformTabsV2 = ({ scraped_data, scraped_id, handleContentTransformed, setLoading }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { scrappedData, languages, selectedLanguages } = useSelector((state) => state.history);

  const [loader, setLoader] = useState(false);
  const [accordion, setAccordion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState([]);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { languages: selectedLanguages?.length ? selectedLanguages : [] },
  });

  /**
   * Fetch scrapped data based on the scrap ID
   * @param {string} scrapId
   */
  const getScrapDetails = async (scrapId) => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      const response = await axios.get(`${configurationEndPoints.firecrawl_scrap_by_id}${scrapId}/`, config);

      dispatch(setScrappedData(response.data.data.data));
      setEditableData(response.data.data.data); // Store a copy for editing
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when scraped_id changes
  useEffect(() => {
    if (scraped_id) getScrapDetails(scraped_id);
  }, [scraped_id]);

  // Update editableData when scrappedData changes
  useEffect(() => {
    if (scrappedData && scrappedData.length > 0) {
      setEditableData([...scrappedData]);
    }
  }, [scrappedData]);

  /**
   * Handle form submission for content transformation
   * @param {Object} data
   */
  const onSubmit = async (data) => {
    dispatch(setProcessToggle(true));
    dispatch(setTabAccess({ index: 2, access: true }));
    setLoader(true);
    setLoading(true);

    try {
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      data.scrap_id = scraped_id;
      data.languages = ["english", ...data.languages];

      const response = await axios.post(configurationEndPoints.firecrawl_scrap_translate, data, config);
      handleContentTransformed(response.data.data);
    } catch (error) {
      console.error("Error transforming content:", error);
    } finally {
      setLoader(false);
      setLoading(false);
    }
  };

  /**
   * Toggle the visibility of the accordion
   * @param {number} index
   */
  const toggleAccordion = (index) => {
    setAccordion(accordion === index ? null : index);
  };

  /**
   * Save the edited data to the Redux store and exit edit mode
   */
  const saveEditedData = (e) => {
    e.stopPropagation(); // Prevent accordion toggle when clicking save
    dispatch(setScrappedData([...editableData]));
    setIsEditing(false);
  };

  /**
   * Enable or disable editing mode
   */
  const toggleEditMode = (e) => {
    e.stopPropagation(); // Prevent accordion toggle when clicking edit button
    if (isEditing) {
      // If currently editing, save the changes
      saveEditedData(e);
    } else {
      // If not editing, enter edit mode
      setIsEditing(true);
    }
  };

  /**
   * Handle changes in the editable fields
   * @param {number} index
   * @param {string} key
   * @param {string} value
   */
  const handleInputChange = (index, key, value) => {
    // Create a deep copy of the editableData array
    const updatedData = JSON.parse(JSON.stringify(editableData));
    // Update the specific field
    updatedData[index][key] = value;
    // Set the updated data
    setEditableData(updatedData);
    console.log("Updated data:", updatedData[index][key]); // Debug log
  };

  return (
    <div>
      <div className="p-4">
        {editableData?.map((data, index) => (
          <div key={index} className="border border-gray-200 rounded-lg mb-4 shadow-sm overflow-hidden">
            {/* Accordion Header */}
            <div onClick={() => toggleAccordion(index)} className="flex items-center justify-between p-4 hover:bg-orange-50 cursor-pointer">
              <h3 className="text-primary text-sm font-bold">{data.title || 'Untitled'}</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleEditMode} 
                  className="text-primary"
                  type="button"
                >
                  {isEditing ? <Save size={18} /> : <Edit size={18} />}
                </button>
                {accordion === index ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-primary" />}
              </div>
            </div>

            {/* Accordion Content */}
            <div className={`transition-all duration-300 ${accordion === index ? "max-h-[500px] p-4 bg-white overflow-y-auto" : "max-h-0 overflow-hidden"}`}>
              {data && Object.entries(data).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <strong className="text-gray-800">{key.toUpperCase()}:</strong>
                  {key === "url" ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
                      View Product
                    </a>
                  ) : isEditing ? (
                    <input
                      type="text"
                      value={value || ''}
                      onChange={(e) => handleInputChange(index, key, e.target.value)}
                      className="border border-gray-300 rounded p-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-gray-700">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Language Selection Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Select Languages</h3>
          <div className="grid grid-cols-2 gap-4">
            {languages?.map((language) => (
              <div key={language.id} className="flex items-center space-x-3">
                <Controller
                  name="languages"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id={language.id}
                      value={language.id}
                      checked={selectedLanguages.includes(language.id)}
                      onChange={() => {
                        dispatch(toggleLanguage(language.id));
                        const newValue = field.value.includes(language.id)
                          ? field.value.filter((lang) => lang !== language.id)
                          : [...field.value, language.id];
                        field.onChange(newValue);
                      }}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  )}
                />
                <label htmlFor={language.id} className="text-sm font-medium text-gray-700">{language.label}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Transform Button */}
        <div className="pt-3">
          <button type="submit" disabled={!isValid || loader} className={`flex w-full justify-center rounded-md px-3 py-2.5 text-base font-semibold text-white shadow-sm ${isValid ? "bg-primary hover:bg-orange-500" : "bg-gray-300 cursor-not-allowed"}`}>
            {loader ? "Transforming Content..." : "Transform Content"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransformTabsV2;