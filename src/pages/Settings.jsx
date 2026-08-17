import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Icon from '../components/common/Icon';
import FormField from '../components/forms/FormField';
import Input from '../components/forms/Input';
import Select from '../components/forms/Select';
import Checkbox from '../components/forms/Checkbox';
import { CURRENCIES, TIMEZONES } from '../data/mockData';

function Panel({ title, desc, children }) {
  return (
    <Card>
      <div className="px-4 py-3 border-b border-line">
        <h4 className="text-sm font-semibold">{title}</h4>
        {desc && <p className="text-xs text-ink mt-0.5">{desc}</p>}
      </div>
      <div className="p-4">{children}</div>
    </Card>
  );
}

export default function Settings() {
  const { settings, saveSettings, setTheme, notify } = useAppContext();
  const [profile, setProfile] = useState(settings.profile);
  const [store, setStore] = useState(settings.store);
  const [notif, setNotif] = useState(settings.notifications);

  const save = () => {
    saveSettings({ profile, store, notifications: notif });
    notify('success', 'Settings saved successfully.');
  };

  const themes = [
    { v: 'dark', label: 'Dark', icon: 'moon' },
    { v: 'light', label: 'Light', icon: 'sun' },
    { v: 'system', label: 'System', icon: 'monitor' },
  ];

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] tracking-[0.2em] text-ink mb-1">SETTINGS</div>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-mut mt-1">Manage your profile, store preferences, notifications, and appearance.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Profile" desc="Your personal information.">
          <FormField label="Full Name">
            <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </FormField>
          <FormField label="Email">
            <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </FormField>
          <FormField label="Phone">
            <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </FormField>
          <div className="mb-0" />
        </Panel>

        <Panel title="Store settings" desc="General configuration for your store.">
          <FormField label="Store Name">
            <Input value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} />
          </FormField>
          <FormField label="Currency">
            <Select value={store.currency} onChange={(e) => setStore({ ...store, currency: e.target.value })}>
              {CURRENCIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Time Zone">
            <Select value={store.timezone} onChange={(e) => setStore({ ...store, timezone: e.target.value })}>
              {TIMEZONES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </FormField>
          <div className="mb-0" />
        </Panel>

        <Panel title="Notifications" desc="Choose what you want to hear about.">
          <div className="divide-y divide-[var(--line)] -my-3">
            <Checkbox
              checked={notif.email}
              onChange={(v) => setNotif({ ...notif, email: v })}
              label="Email notifications"
              description="Receive a daily summary of store activity."
            />
            <Checkbox
              checked={notif.orders}
              onChange={(v) => setNotif({ ...notif, orders: v })}
              label="Order notifications"
              description="Get notified when a new order is placed."
            />
            <Checkbox
              checked={notif.lowStock}
              onChange={(v) => setNotif({ ...notif, lowStock: v })}
              label="Low-stock notifications"
              description="Alerts when products fall below 8 units."
            />
          </div>
        </Panel>

        <Panel title="Appearance" desc="How the admin looks for you.">
          <div className="text-xs font-medium text-mut mb-2 uppercase tracking-wide">Theme</div>
          <div className="flex gap-2">
            {themes.map((t) => (
              <div
                key={t.v}
                onClick={() => setTheme(t.v)}
                className={`flex-1 border rounded-lg p-3 text-center cursor-pointer select-none ${
                  settings.theme === t.v ? 'border-mut bg-panel2' : 'border-line hover:border-line2'
                }`}
              >
                <Icon name={t.icon} size={16} className="mx-auto text-mut" />
                <div className="text-xs mt-1.5 text-mut">{t.label}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-ink mt-3">Theme is applied immediately and persisted in this browser.</p>
        </Panel>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-[11px] text-ink">Changes are stored locally in this browser.</p>
        <Button onClick={save}>Save Changes</Button>
      </div>
    </div>
  );
}