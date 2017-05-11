let route = {
    personalInformation: {
        generalInformation: { name: "General Information", path: "resume/generalInformation" },
        objectives: { name: "Personal Objectives", path: "resume/objectives" }
    },
    education: {
        college: { name: "College", path: "resume/college" },
        career: { name: "Career", path: "resume/career" },
        certifications: { name: "Certification", path: "resume/certification" }
    },
    experience: {        
        experience: { name: "Experience", path: "resume/experience" }
    },
    skills:{
        technicalSkills:{name:"Technical Skills", path: "resume/TechSkills"},
        lenguages: { name: "Lenguages", path: "resume/lenguages"}
    }
};
export default route;