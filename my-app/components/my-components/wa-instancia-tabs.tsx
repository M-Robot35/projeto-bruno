'use client'
import { useState, useRef } from "react";
import InstanceWebhook from "./wa-webhook";
import InstanceSettings from './wa-settings';
import InstanceProxy from "./wa-proxy";
import InstanceGroup from "./wa-group";
import InstanceProfile from "./wa-profile";
import InstanceSchundlerWhatsapp from "./wa-schundler";
import IaConfig from "./ia-config";
import { JSX } from 'react';

export interface IIinstaceParams {
  instanceName: string;
  apiKey: string;
}

// Tempo de expiração do cache em milissegundos (ex: 5 minutos)
const CACHE_TTL = 5 * 60 * 1000;

export default function InstanciasTabs({ apiKey, instanceName }: IIinstaceParams) {
  const [activeTab, setActiveTab] = useState("ia");

  // Cache com timestamp para controlar expiração
  const tabCache = useRef<Record<string, { content: JSX.Element; timestamp: number }>>({});

  const createTabContent = (tab: string): JSX.Element  => {
    switch (tab.toLowerCase()) {
      case "profile":
        return <InstanceProfile instanceName={instanceName} apikey={apiKey} />;
      case "IA".toLowerCase():
        return <IaConfig />;
      case "proxy".toLowerCase():
        return <InstanceProxy apiKey={apiKey} instanceName={instanceName} />;
      case "webhook".toLowerCase():
        return <InstanceWebhook apikey={apiKey} instanceName={instanceName} />;
      case "settings".toLowerCase():
        return <InstanceSettings apiKey={apiKey} instanceName={instanceName} />;
      // case "grupos".toLowerCase():
      //   return <InstanceGroup instanceName={instanceName} apikey={apiKey} />;
      // case "schundler".toLowerCase():
      //   return <InstanceSchundlerWhatsapp />;
      default:
        return <div>Tab não encontrada.</div>;
    }
  };

  const getCachedContent = (tab: string): JSX.Element => {
    const cache = tabCache.current[tab];
    const now = Date.now();

    if (!cache || now - cache.timestamp > CACHE_TTL) {
      const newContent = createTabContent(tab);
      tabCache.current[tab] = {
        content: newContent,
        timestamp: now,
      };
      return newContent;
    }

    return cache.content;
  };

  //const tabName = ["profile", "IA", "proxy", "webhook", "settings"];
  const tabName = ["IA", "proxy", "webhook", "settings"];

  return (
    <div className="mt-4">
      {/* Navegação das Abas */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          {tabName.map((tab) => (
            <li key={tab} className="me-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
                type="button"
                role="tab"
                aria-controls={tab}
                aria-selected={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Conteúdo da Aba Ativa (com cache e expiração) */}
      <div
        key={activeTab}
        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        id={activeTab}
        role="tabpanel"
        aria-labelledby={`${activeTab}-tab`}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {getCachedContent(activeTab)}
        </p>
      </div>
    </div>
  );
}
