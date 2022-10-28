import styles from './Tabs.module.scss';

interface TabsProps {
    tabList: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabList, activeTab, setActiveTab }) => {

    const changeActiveTab = (tab: string) => {
        setActiveTab(tab);
    }

    return (
        <div className={styles.tabs}>
            {
                !!tabList.length && (
                    tabList.map((tab) => (
                        <span
                            className={`${styles.tabs__item} ${tab === activeTab ? styles.tabs__item_active : ""}`} 
                            key={tab}
                            onClick={() => changeActiveTab(tab)}
                        >{tab}</span>
                    ))
                )
            }
        </div>
    );
};

export default Tabs;
